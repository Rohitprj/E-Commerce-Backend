const mongoose = require("mongoose");

const authSignUp = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});
const SignUp = mongoose.model("authSignUp", authSignUp);

module.exports = SignUp;
