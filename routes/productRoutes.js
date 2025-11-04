const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    if (!name || !price)
      return res.status(400).json({ error: "Name and price required" });

    const newProduct = await Product.create({ name, description, price, image });
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
