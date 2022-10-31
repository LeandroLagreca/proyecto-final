const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("user", {
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
    firstname: { type: DataTypes.STRING, defaultValue: "" },
    lastname: { type: DataTypes.STRING, defaultValue: "" },
    country: { type: DataTypes.STRING, defaultValue: "" },
    province: { type: DataTypes.STRING, defaultValue: "" },
    cardholder: { type: DataTypes.STRING, defaultValue: "" },
    cardnumber: { type: DataTypes.STRING, defaultValue: "" },
    cuit: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: "",
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
      defaultValue: false,
    },
    cart: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    deseos: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    biblioteca: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
};
