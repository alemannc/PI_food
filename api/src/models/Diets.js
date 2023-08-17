const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('diets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};