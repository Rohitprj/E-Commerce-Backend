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

async function createCategory(req, res) {
  try {
    const { name, slug, description, image } = req.body;

    const existingCategory = await Categories.find({ name, slug });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const categories = new Categories({ name, slug, description, image });

    const savedCategories = await categories.save();
    console.log(savedCategories);

    res.status(201).json({ message: "Category created !" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
}
module.exports = { allCategories, createCategory };
