const { required } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  item: { type: [productSchema], required: true },
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
