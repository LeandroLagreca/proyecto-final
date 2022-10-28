const { PurchaseOrder, Videogame, User} = require("../db");
const { Op } = require("sequelize");

const createOrder = async (req, res) => {
  const { games, totalPrice } = req.body.bildData;
  const { saveData = false } = req.query;
  const { userID, cuit, dni, address } = req.body.userData;

  if (saveData) {
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
    } catch (error) {
      console.log(error);
    }
  }

  try {
    //get game data
    let gameIDS = games.map((e) => {
      return e.id;
    });

    const gameInfo = games.map((e) => {
      return {
        id: e.id,
        name: e.name,
        price: e.price,
        cant: e.cant,
      };
    });

    const findGames = await Videogame.findAll({
      where: { id: { [Op.or]: [...gameIDS] } },
    });
    //crear orden y asociarla
    let user = await User.findOne({ where: { id: userID } });
    if (user) {
      let newOrder = await PurchaseOrder.create({
        games: gameInfo,
        totalprice: totalPrice,
        userId: userID
      });
      await newOrder.addVideogames(findGames);

      await user.addPurchaseOrder(newOrder);
      return res.status(201).json({
        msg: "Order created successfully",
        data: newOrder,
      });
    } else {
      return res.status(404).send({ msg: "thats not a valid userid" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
};

const getUserOrders = async (req, res) => {
  let { id } = req.params;
  if (id) {
    try {
      let found = await User.findOne({
        where: { id: id },
        attributes: ["name", "address"],
        include: [
          {
            model: PurchaseOrder,
            attributes: ["id", "status", "totalprice", "date"],
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
    return res.status(404).send({ msg: "an userID is required by params" });
  }
};
const getAllOrders = async (req, res) => {
  const { filter = "" } = req.query;
  const { date, status, name } = filter;
  const where = {};

  if (status) {
    where.status = status;
  }

  if (name) {
    where.name = {
      [Op.iLike]: `%${name}%`,
    };
  }

  try {
    const orders = await PurchaseOrder.findAll({
      attributes: ['id', 'games', 'status', 'totalprice', 'date'],
      where,
      include: {
        model: User,
        attributes: ['name', 'email', 'id']
      }
    });
    if (!orders.length) {
      return res.status(404).send("Couldn't find any order");
    }
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
const ChangeStatePurchaseOrder = async (req, res) => {
  let { status } = req.body;
  let { id } = req.params;
  if (status && id) {
    try {
      let finalState = await PurchaseOrder.update(
        { status },
        { where: { id: id } }
      );
      res.status(200).send({ msg: "up to date" });
    } catch (error) {
      res.status(404).send({ msg: error });
    }
  }
};
module.exports = {
  getAllOrders,
  createOrder,
  getUserOrders,
  ChangeStatePurchaseOrder,
};
