const express = require("express");
const {
  products,
  productById,
  addProduct,
  updateProduct,
  updateProdPartially,
  deleteProduct,
} = require("../controllers/productController");
const authenticationToken = require("../middleware/productMiddleware");
const router = express.Router();

router.get("/products", authenticationToken, products);
router.get("/productId/:id", productById);
router.post("/addProduct", addProduct);
router.put("/updateProduct/:id", updateProduct);
router.patch("/partialUpdate/:id", updateProdPartially);
router.delete("/deleteProduct/:id", deleteProduct);
module.exports = router;
