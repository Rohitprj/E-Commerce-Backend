const express = require("express");
const router = express.Router();

const { allCategories } = require("../controllers/categoriesController");

router.get("/allCategories", allCategories);
module.exports = router;
