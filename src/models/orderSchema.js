const { Mongoose } = require("mongoose");
const { AddressBasedSchema } = require("./address.order");
const { cartItemSchema } = require("./cartSystemSchema");

const orderSchema = new Mongoose.Schema({
  address: { type: AddressBasedSchema, required: true },
  items: { type: [cartItemSchema], required: true },
});
