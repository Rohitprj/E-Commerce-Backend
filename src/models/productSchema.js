const { required } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
