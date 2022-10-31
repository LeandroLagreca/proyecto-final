require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { generateKey } = require('crypto');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
// cambiar name de db
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  // CONFIGURCION ADICIONAL
  
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

// cambiar relaciones
const { Videogame, Genre, User, Comment,PurchaseOrder, Question} = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

//Relaciones Videojuego
Videogame.belongsToMany(Genre, {through : 'VideogameGenre'});
Videogame.belongsToMany(User, {through : 'VideogameUser'});
Videogame.belongsToMany(Comment, {through : 'VideogameComment'});
Videogame.belongsToMany(PurchaseOrder,{through:'VideogamePurchaseOrder'})
Videogame.belongsToMany(Question, {through : 'VideogameQuestions'});
//Relaciones Genre
Genre.belongsToMany(Videogame, {through : 'VideogameGenre'});

//Relaciones User
User.belongsToMany(Comment, {through : 'UserComment'})
User.belongsToMany(Videogame, {through : 'VideogameUser'});
User.belongsToMany(PurchaseOrder,{through:'UserPurchaseOrder'})
User.belongsToMany(Question, {through : 'UserQuestions'});
//Relaciones Comment
Comment.belongsTo(Videogame)
Comment.belongsTo(User)
//Relaciones
PurchaseOrder.belongsToMany(Videogame,{through:'VideogamePurchaseOrder'})
PurchaseOrder.belongsTo(User,{through:'UserPurchaseOrder'})
//Relaciones Question
Question.belongsTo(Videogame)
Question.belongsTo(User)
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,   
  Op,  // para importart la conexión { conn } = require('./db.js');
};
