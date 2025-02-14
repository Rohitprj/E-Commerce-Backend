const express = require("express");
const router = express.Router();

const {
  allCategories,
  createCategory,
  getCategoryById,
} = require("../controllers/categoriesController");

router.get("/allCategories", allCategories);
router.post("/createCategory", createCategory);
router.get("/getCategoryById/:id", getCategoryById);
module.exports = router;
