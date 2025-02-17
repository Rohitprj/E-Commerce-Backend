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
    console.log("Received request for product ID:", req.params.id);
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found !" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
}

// adding products
async function addProduct(req, res) {
  try {
    const {
      product_id,
      name,
      category,
      image,
      price,
      rating,
      description,
      brand,
    } = req.body;

    const addProduct = new Products({
      product_id,
      name,
      category,
      image,
      price,
      rating,
      description,
      brand,
    });
    await addProduct.save();
    res.status(201).json({ message: "product addad !", addProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error!" });
  }
}
module.exports = { products, productById, addProduct };
