const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

const cartItemSchema = new Schema({
  prodId: {
    type: Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true },
});

const cartSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "users", required: true },
  item: { type: [cartItemSchema], default: [] },
});

const CreateCart = mongoose.model("carts", cartSchema);

module.exports = CreateCart;
