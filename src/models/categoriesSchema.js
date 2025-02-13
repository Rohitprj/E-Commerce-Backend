const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Categories = mongoose.model("categories", categoriesSchema);
module.exports = Categories;
