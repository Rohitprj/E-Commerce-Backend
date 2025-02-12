const express = require("express");
const { signUp, logIn } = require("../controllers/authController");
const {
  signUpValidation,
  logInValidation,
} = require("../middleware/authMiddleware");
const { products } = require("../controllers/productController");
const authenticationToken = require("../middleware/productMiddleware");
const router = express.Router();

router.post("/signUp", signUpValidation, signUp);
router.post("/logIn", logInValidation, logIn);
router.get("/products", authenticationToken, products);

module.exports = router;
