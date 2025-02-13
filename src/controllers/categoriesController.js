const Categories = require("../models/categoriesSchema");

export async function allCategories(req, res) {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
}
