const Products = require("../models/productSchema");

async function products(req, res) {
  try {
    const getProducts = await Products.find();
    res.json(getProducts);
  } catch (error) {
    res.status(500).json({ message: "Products not found !" });
  }
}

module.exports = { products };
