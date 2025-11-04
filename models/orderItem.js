const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

// Many-to-many relation: Order ↔ Product via OrderItem
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = OrderItem;
