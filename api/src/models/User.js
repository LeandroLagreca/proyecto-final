const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        defaultValue:false
      },
      cart:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      deseos:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },
      biblioteca:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: []
      },

})};
