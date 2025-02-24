const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
// {
//   "cart_id": "string",
//   "user_id": "string",
//   "products": [
//     {
//       "product_id": "string",
//       "name": "string",
//       "category": "string",
//       "image": "string",
//       "price": number,
//       "quantity": number
//     }
//   ],
//   "total_price": number
// }
