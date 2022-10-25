const { PurchaseOrder, User, Videogame } = require("../db");
const { Op } = require("sequelize");

const createOrder = async (req, res) => {
  let { purchase } = req.body.games;
  const { userID, cuit, dni, address } = req.body.userData;
  if (userID && purchase && cuit && dni && address) {
    try {
      //update user data
      let updatedUserData = await User.update(
        {
          cuit: cuit,
          dni: dni,
          address: address,
        },
        { where: { id: userID } }
      );
      //get game data
      const gamesData = await Promise.all(
        purchase.map(async (e) => {
          let gameData = await Videogame.findOne({
            where: { id: e.gameID },
            attributes: ["name", "price", "id"],
          });

          let amount = e.amount;

          let subtotal = gameData.dataValues.price * amount;
          let gameinfo = {
            name: gameData.dataValues.name,
            subtotal,
            id: gameData.dataValues.id,
          };
          return gameinfo;
        })
      );

      //get total price
      const getTotal = () => {
        let sum = 0;
        for (let i = 0; i < gamesData.length; i++) {
          sum += Number(gamesData[i].subtotal);
        }
        return sum;
      };
      let total = getTotal();
      //crear orden y asociarla
      let user = await User.findOne({ where: { id: userID } });
      if (user !== null) {
        let newPurchase = await PurchaseOrder.create({
          totalprice: total,
          userid: userID,
        });
        user.addPurchaseOrder(newPurchase);

        let gameIDS = gamesData.map((e) => {
          return e.id;
        });

        const games = await Videogame.findAll({
          where: { id: { [Op.or]: [gameIDS] } },
        });
        let promiseAssociation = games.map(async (game) => {
          return await game.addPurchaseOrder(newPurchase);
        });
        const resolvedPromise = await Promise.all(promiseAssociation);

        return res.status(200).send({ gamesData, total });
      } else {
        return res.status(404).send({ msg: "thats not a valid userid" });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res
      .status(400)
      .json({ error: "the userID and gameID are required by body" });
  }
};

const getUserOrders = async (req, res) => {
  let { userID } = req.body;
  if (userID) {
    try {
      let found = await User.findOne({
        where: { id: userID },
        attributes: ["name", "address"],
        include: [
          {
            model: PurchaseOrder,
            attributes: ["id", "status", "totalprice", "createdAt"],
            through: { attributes: [] },
          },
        ],
      });
      if (found === null) {
        res.status(404).send("we couldn't match that userID");
      } else {
        res.send(found);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(404).send({ msg: "an userID is required by body" });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.findAll();
    if (!orders.length) {
      return res.status(404).send("Dont exist any order yet");
    }
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const ChangeStatePurchaseOrder = async (req, res) => {
  let { status } = req.body;
  let {id}=req.params;
  if (status && id) {
    try {
      let finalState = await PurchaseOrder.update(
        { status },
        { where: { id: id } }
      );
      res.status(200).send({msg:"up to date"})
    } catch (error) {
      res.status(404).send({msg:error})
      
    }
  }
};
module.exports = {
  getAllOrders,
  createOrder,
  getUserOrders,
  ChangeStatePurchaseOrder
};
