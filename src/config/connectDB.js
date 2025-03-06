const mongoose = require("mongoose");
function connectDB() {
  try {
    mongoose.connect(process.env.URL);
    console.log("DB Connected");
  } catch (e) {
    console.log("Not working", e);
  }
}
module.exports = { connectDB };
