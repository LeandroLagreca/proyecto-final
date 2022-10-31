const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('image', {
    name: {
        type: DataTypes.STRING,
				unique: true,
				allowNull: false
    },
    image: {
			type: DataTypes.TEXT,
			alowNull: false
    }
  })
};