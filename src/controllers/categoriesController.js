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
    const { name, description, image } = req.body;

    const slug = name.toLowerCase();

    const existingCategoryName = await Categories.findOne({ name });
    if (existingCategoryName) {
      return res.status(400).json({ message: "Category name already exists" });
    }
    const existingCategoryDes = await Categories.findOne({ description });
    if (existingCategoryDes) {
      return res
        .status(400)
        .json({ message: "Category description already exists" });
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

async function getCategoryById(req, res) {
  try {
    const categoryById = await Categories.findById(req.params.id);
    if (!categoryById) {
      return res.status(404).json({ message: "Category not found !" });
    }
    res.json({ success: true, categoryById });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { allCategories, createCategory, getCategoryById };
