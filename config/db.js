const { Sequelize } = require("sequelize");

// Create a new Sequelize instance with MySQL connection
const sequelize = new Sequelize("flutter_ecommerce", "root","Harsh@123", {
  host: "localhost",
  dialect: "mysql", // ✅ This line is required to specify MySQL
  logging: false,   // optional: disable SQL query logs in console
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

// Export the sequelize instance to use in other files
module.exports = sequelize;
