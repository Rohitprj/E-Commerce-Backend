const express = require("express");
const { products } = require("../controllers/productController");
const authenticationToken = require("../middleware/productMiddleware");
const router = express.Router();

router.get("/products", authenticationToken, products);
module.exports = router;
