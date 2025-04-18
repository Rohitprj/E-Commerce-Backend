const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

const cartPrizingSchema = new Schema({
  subtotal: { type: Number, required: true, min: 0, default: 0 },
  tax: { type: Number, required: true, min: 0, default: 0 },
  discount: { type: Number, required: true, min: 0, default: 0 },
});
const cartItemSchema = new Schema(
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
    total: { type: Number, min: 0, default: 0, required: true },
  },
  {
    _id: false,
  }
);
cartSchema.add(cartPrizingSchema);

const CreateCart = mongoose.model("carts", cartSchema);

module.exports = { CreateCart, cartPrizingSchema, cartItemSchema };
