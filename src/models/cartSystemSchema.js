const mongoose = require("mongoose");

const cartItemSchema = new Schema({
  prodId: { type: Types.ObjectId, ref: "products", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema({});
module.exports = {};
