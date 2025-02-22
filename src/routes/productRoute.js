const express = require("express");
const {
  products,
  productById,
  addProduct,
} = require("../controllers/productController");
const authenticationToken = require("../middleware/productMiddleware");
const router = express.Router();

router.get("/products", authenticationToken, products);
router.get("/productId/:id", productById);
router.post("/addProduct", addProduct);
router.put("updateProduct");
module.exports = router;
