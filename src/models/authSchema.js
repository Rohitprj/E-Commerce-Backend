const { required } = require("joi");
const mongoose = require("mongoose");

const authSignUp = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  IpAddress: { type: String, required: true },
  UserDevice: { type: String, required: true },
});
const SignUp = mongoose.model("authSignUp", authSignUp);

module.exports = SignUp;
