const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

const cartItemSchema = new Schema({
  prodId: {
    type: Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "users" },
  item: { type: [cartItemSchema], required: true },
});

const CreateCart = mongoose.model("carts", cartSchema);

module.exports = CreateCart;
