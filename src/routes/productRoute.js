const express = require("express");
const { products, productById } = require("../controllers/productController");
const authenticationToken = require("../middleware/productMiddleware");
const router = express.Router();

router.get("/products", authenticationToken, products);
router.get("/productId/:id", productById);
module.exports = router;
