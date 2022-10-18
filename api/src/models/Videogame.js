<<<<<<< HEAD
const { DataTypes, NOW } = require('sequelize');
=======
const { DataTypes, NOW } = require("sequelize");
>>>>>>> b5fb843e15c8e987a0b6ff04702a6774155581c8
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
<<<<<<< HEAD
  sequelize.define('videogame', {
=======
  sequelize.define("videogame", {
>>>>>>> b5fb843e15c8e987a0b6ff04702a6774155581c8
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    rating_api: {
      type: DataTypes.FLOAT,
    },
    rating_user: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    released: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    price: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    images: {
      type: DataTypes.TEXT,
    },
    requirements: {
      type: DataTypes.TEXT,
    },
  });
};
