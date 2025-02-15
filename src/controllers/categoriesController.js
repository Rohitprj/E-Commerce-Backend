const Categories = require("../models/categoriesSchema");

// get all categories
async function allCategories(req, res) {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Categories not found !" });
  }
}

// create new category
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

// get category by id
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

// Update category by id using patch method
async function updateCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateCategory = await Categories.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Updated Category: ", updateCategory);

    if (!updateCategory) {
      return res.status(404).json({ message: "category not found" });
    }
    res
      .status(200)
      .json({ message: "category updated!", category: updateCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error !" });
  }
}

// Delete category by id using delete method
async function deleteCategoryById(req, res) {
  try {
    const { id } = req.params.id;
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(404).json({ message: "Category not found!" });
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  allCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
