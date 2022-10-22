const { PurchaseOrder, User, Videogame } = require("../db");


const createOrder = async (req, res) => {
  let { purchase } = req.body.games;
  const { userID, cuit, dni, address } = req.body.userData;
  if (userID && purchase && cuit && dni && address) {
    try {
      //update user data
      let updateUserData = await User.update(
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
      let newPurchase = await PurchaseOrder.create({ totalprice: total });
      let user = await User.findOne({ where: { id: userID } });

      user.addPurchaseOrder(newPurchase);
      //relacionando con juegos
    

      return res.status(200).send({ gamesData, total });
    } catch (error) {
      console.log(error);
    }
  } else {
    res
      .status(400)
      .json({ error: "the userID and gameID are required by body" });
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

module.exports = {
  getAllOrders,
  createOrder,
};
