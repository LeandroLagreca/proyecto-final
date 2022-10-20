const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("PurchaseOrder", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    companyname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "GameScript",
    },
    companycuit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "20-45786529-3",
    },
    companyaddress: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "calle siempre viva 123",
    },
    companyemail: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "GameScript@gmail.com",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "received",
      validate: {
        customValidator: (value) => {
          const enums = ["received", "inprocess", "canceled", "finalized"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    totalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
