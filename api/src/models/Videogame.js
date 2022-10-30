const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
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
      type: DataTypes.FLOAT,
      defaultValue: 0,
      get() {
        let value = this.getDataValue('price')
        if(value === 'null') return 0
        else if(this.discount?.status) return this.discount.currentPrice
        else return parseInt(value) 
      }
    },
    images: {
      type: DataTypes.TEXT,
    },
    requirements: {
      type: DataTypes.TEXT,
    },
    stock:{
      type:DataTypes.INTEGER,
      defaultValue:50
    },
    discount: {
      type: DataTypes.JSON,
      defaultValue: {
        status: false,
        prevPrice: null,
        currentPrice: null
      }
    },
    trailer: {
      type: DataTypes.STRING
    },
  });
};
