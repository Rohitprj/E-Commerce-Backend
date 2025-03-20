const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

const AddressBasedSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  address1: { type: String, required: true },
  address: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

const AddressSchema = new Schema(
  {
    uid: { type: Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

AddressBasedSchema.add(AddressSchema);
const AdderssModel = mongoose.model("addresses", AddressSchema);

module.exports = { AdderssModel, AddressBasedSchema };
