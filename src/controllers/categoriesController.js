const Categories = require("../models/categoriesSchema");

async function allCategories(req, res) {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Categories not found !" });
  }
}

async function newCategory(req, res) {
  try {
    const { name, slug, description, image } = req.body;

    const existingCategory = await Categories.find({ name, slug });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const categories = new Categories({ name, slug, description, image });
    const savedCategories = await categories.save();
    console.log(savedCategories);
  } catch (error) {
    console.log(error);
  }
}
module.exports = { allCategories, newCategory };
