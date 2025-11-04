require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sync all models and relationships
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ All tables synced with MySQL");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Use PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
