const { products } = require("../controllers/productController");
const authenticationToken = require("../middleware/productMiddleware");

router.get("/products", authenticationToken, products);
module.exports = router;
