const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Product = require("../models/product");
const User = require("../models/user");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body; 
    // items = [{ productId: 1, quantity: 2 }, ...]

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({ userId, totalAmount });

    // Add items
    for (const item of items) {
      await OrderItem.create({
        OrderId: order.id,
        ProductId: item.productId,
        quantity: item.quantity,
      });
    }

    res.json({ message: "Order created", orderId: order.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.findAll({
      where: { UserId: userId },
      include: [
        {
          model: Product,
          through: { attributes: ["quantity"] },
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
