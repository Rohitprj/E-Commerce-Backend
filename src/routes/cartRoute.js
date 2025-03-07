const express = require("express");
const { addToCart, cartSystem } = require("../controllers/cartController");
const router = express.Router();

router.post("/cartSystem", cartSystem);

module.exports = router;
