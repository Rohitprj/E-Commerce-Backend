const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

export const cartItemSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    name: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const cartSchema = new Schema(
  {
    _id: { type: Types.ObjectId, ref: "users", required: true },
    item: { type: [cartItemSchema], default: [] },
  },
  {
    _id: false,
  }
);

const CreateCart = mongoose.model("carts", cartSchema);

module.exports = CreateCart;
