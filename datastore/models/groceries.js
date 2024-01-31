const { DataTypes } = require('sequelize');
const {sequelize} = require("../connection")

const groceryModel = {
  itemid: { type: DataTypes.STRING, allowNull: false, primaryKey: true},
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  availableCount: { type: DataTypes.INTEGER, allowNull: false },
};

const Groceries = sequelize.define("groceries", groceryModel);

module.exports = {
    Groceries
}