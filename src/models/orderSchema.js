const { Mongoose, Types } = require("mongoose");
const { AddressBasedSchema } = require("./address.order");
const { cartItemSchema } = require("./cartSystemSchema");

const OrderSchema = new Mongoose.Schema({
  address: { type: AddressBasedSchema, required: true },
  items: { type: [cartItemSchema], required: true },
  uid: { type: Types.ObjectId, ref: "users", required: true },
  shippingFee: { type: Number, default: 0, min: 0 },
  status: {
    type: String,
    enum: [
      "Placed",
      "Confirmed",
      "Shipped",
      "OFD",
      "Delivered",
      "Cancelled",
      "Returned",
    ],
    default: "Placed",
  },
  orderTimeline: {
    placedAt: { type: Date, default: Date.now, required: true },
    confirmedAt: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
    returnedAt: { type: Date },
  },
});
module.exports = { OrderSchema };
