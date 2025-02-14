const express = require("express");
const router = express.Router();

const {
  allCategories,
  createCategory,
} = require("../controllers/categoriesController");

router.get("/allCategories", allCategories);
router.post("/createCategory", createCategory);
module.exports = router;
