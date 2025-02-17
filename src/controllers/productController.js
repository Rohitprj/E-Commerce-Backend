const Products = require("../models/productSchema");

// get all products
async function products(req, res) {
  try {
    const getProducts = await Products.find();
    res.json(getProducts);
  } catch (error) {
    res.status(500).json({ message: "Products not found !" });
  }
}

// get product by id
async function productById(req, res) {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found !" });
    }
    res.status(201).json({ message: "Product found successfully !" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { products, productById };
