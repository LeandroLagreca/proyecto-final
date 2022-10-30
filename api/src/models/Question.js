const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('question', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      defaultValue: null
    }
  })
};