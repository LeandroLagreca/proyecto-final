const { Router } = require("express");
const { postPayment } = require("../controllers/paymentController");
const {
  postComment,
  getUserComments,
  getGameComments,
  updateComment,
} = require("../controllers/Comments");
const {
  videogamePost,
  videogameByID,
  getGenres,
  updateVideogame,
  getAllGames,
  getDiscounts,
  getRowTableVideoGames,
  UpdateStock,
  getUserGames
} = require("../controllers/videogameControllers.js");

const transporter = require("../nodemailer/config");

const {
  getAllOrders,
  createOrder,
  getUserOrders,
  ChangeStatePurchaseOrder,
} = require("../controllers/Orders");

const {
  allDataUser,
  UserByName,
  UserByID,
  UserPost,
  UserUpdate,
  PostLogin,
} = require("../controllers/User.js");
const { sendEmail } = require('../controllers/Emails')
const {
  upLoadDicountsBanner,
  getDiscountsBanner,
} = require("../controllers/Images");

const {
  createQuestion,
	answerQuestion,
  getQuestions
} = require('../controllers/questions/Question')

const router = Router();

//Configuración de rutas
//Emails
router.post("/sendMail", sendEmail);
//Payment
router.post("/payment", postPayment);

//Comment
router.get("/user/comments", getUserComments);

router.get("/videogames/comments", getGameComments);

router.post("/comments", postComment);

router.put("/comments", updateComment);


//Q&A
router.get('/questions', getQuestions)

router.post('/questions', createQuestion)

router.put('/answer/:questionId', answerQuestion)

//Videogames




router.get("/row-videogames", getRowTableVideoGames);

router.put("/videogames/stock",UpdateStock)

router.get("/videogames/user/:id", getUserGames);

router.get("/videogames/:id", videogameByID);

router.post("/videogames", videogamePost);

router.get("/videogames", getAllGames);

router.put("/videogames/:id", updateVideogame);

router.get("/genres", getGenres);

router.get("/discounts", getDiscounts);

//User
router.get("/user", allDataUser);

router.get("/searchUser", UserByName);

router.get("/user/:id", UserByID);

router.put("/user/:id", UserUpdate);

//sesion
router.post("/register", UserPost);

router.post("/login", PostLogin);

//Orders
router.get("/orders", getAllOrders);
router.get("/orders/user/:id", getUserOrders);
router.post("/orders", createOrder);
router.put("/orders/:id", ChangeStatePurchaseOrder);

//Images
router.post("/images/discounts", upLoadDicountsBanner);
router.get("/images/discounts", getDiscountsBanner);

module.exports = router;
