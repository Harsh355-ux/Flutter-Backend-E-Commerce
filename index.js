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
app.use(cors());
app.use(express.json());

// Sync all models and relationships
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ All tables synced with MySQL");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
