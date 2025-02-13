const mongoose = require("mongoose");
function connectDB() {
  try {
    mongoose.connect(
      "mongodb+srv://New_Demo_User:VXrC2WGyxTwyU2sT@cluster0.shqzn.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB Connected");
  } catch (e) {
    console.log("Not working", e);
  }
}
module.exports = { connectDB };
