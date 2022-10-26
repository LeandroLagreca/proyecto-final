const { Router } = require("express");
const { postPayment } = require("../controllers/paymentController");
const {
  postComment,
  getUserComments,
  getGameComments,
} = require("../controllers/Comments");
const {
  videogamePost,
  videogameByID,
  getGenres,
  updateVideogame,
  getAllGames,
  getDiscounts,
  getRowTableVideoGames,
} = require("../controllers/videogameControllers.js");
const axios = require("axios");

const {
  getAllOrders,
  createOrder,
  getUserOrders,
  ChangeStatePurchaseOrder
} = require("../controllers/Orders");

const {
  allDataUser,
  UserByID,
  UserPost,
  UserUpdate,
  PostLogin,
} = require("../controllers/User.js");
const {
  upLoadDicountsBanner,
  getDiscountsBanner,
} = require("../controllers/Images");
const router = Router();

//Configuración de rutas

//Payment
router.post("/payment", postPayment);

//Comment
router.get("/user/comments", getUserComments);

router.get("/videogames/comments", getGameComments);

router.post("/comments", postComment);

//Videogame

router.get("/row-videogames", getRowTableVideoGames);

router.get("/videogames/:id", videogameByID);

router.post("/videogames", videogamePost);

router.get("/videogames", getAllGames);

router.put("/videogames/:id", updateVideogame);

router.get("/genres", getGenres);

router.get("/discounts", getDiscounts);

//User
router.get("/user", allDataUser);

router.get("/user/:id", UserByID);

router.put("/user/:id", UserUpdate);


//sesion
router.post("/register", UserPost);

router.post("/login", PostLogin);

//Orders
router.get("/orders", getAllOrders);
router.get("/orders/user/:id", getUserOrders);
router.post("/orders", createOrder);
router.put("/orders/:id",ChangeStatePurchaseOrder)
//Images
router.post("/images/discounts", upLoadDicountsBanner);
router.get("/images/discounts", getDiscountsBanner);

module.exports = router;
