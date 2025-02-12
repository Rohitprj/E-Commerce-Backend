const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
  description: { type: String, required: true },
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
