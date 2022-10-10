const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    rating_like: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    rating_dislike: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    
})};
