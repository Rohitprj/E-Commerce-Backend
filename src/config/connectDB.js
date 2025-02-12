const mongoose = require("mongoose");
function connectDB() {
  try {
    mongoose.connect("mongodb://localhost:27017/E-CommerceDB");
    console.log("DB Connected");
  } catch (e) {
    console.log("Not working", e);
  }
}
module.exports = { connectDB };
