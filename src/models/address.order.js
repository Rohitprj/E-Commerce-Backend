const Mongoose = require("mongoose");
const { Types, Schema } = Mongoose;

const addressBasedSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  address1: { type: String, required: true },
  address: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

const adderssSchema = new Schema({
  uid: { type: Types.ObjectId, required: true, ref: "user" },
});
