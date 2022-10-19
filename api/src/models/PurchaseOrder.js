const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("purchaseOrder", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    //datos proveedor
    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "GameScript",
    },
    companycuit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "20-45786529-3",
    },
    companyaddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "calle siempre viva 123",
    },
    companyemail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: "GameScript@gmail.com",
    },
    status: {
      type: DataTypes.ENUM("received", "inprocess", "canceled", "finalized"),
      allowNull: false,
    },
    totalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
