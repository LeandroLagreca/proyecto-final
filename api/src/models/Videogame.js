const { DataTypes, NOW } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
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
    },
    released: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    price: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.TEXT,
    },
    requirements: {
      type: DataTypes.TEXT,
    },

})};
