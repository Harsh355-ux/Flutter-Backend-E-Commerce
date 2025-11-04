const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Order = sequelize.define("Order", {
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
});

// Each order belongs to a user
User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
