const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const newProduct = await Product.create({ name, description, price, image });
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
};
