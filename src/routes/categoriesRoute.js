const express = require("express");
const router = express.Router();

const {
  allCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoriesController");

router.get("/allCategories", allCategories);
router.post("/createCategory", createCategory);
router.get("/getCategoryById/:id", getCategoryById);
router.patch("/updateCategoryById/:id", updateCategoryById);
router.delete("/deleteCategoryById/:id", deleteCategoryById);
module.exports = router;
