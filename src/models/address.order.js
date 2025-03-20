const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

const addressBasedSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  address1: { type: String, required: true },
  address: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

const addressSchema = new Schema(
  {
    uid: { type: Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

addressBasedSchema.add(addressSchema);
const AdderssModel = mongoose.model("addresses", addressSchema);

module.exports = AdderssModel;
