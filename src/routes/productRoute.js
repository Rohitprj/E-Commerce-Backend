const express = require("express");
const {
  products,
  productById,
  addProduct,
  updateProduct,
  updateProdPartially,
  deleteProduct,
} = require("../controllers/productController");
// const authenticationToken = require("../middleware/productMiddleware");
const router = express.Router();

// router.get("/products", authenticationToken, products);
router.get("/products", products);
router.get("/productId/:id", productById);
router.post("/addProduct", addProduct);
router.put("/updateProduct/:id", updateProduct);
router.patch("/partialUpdate/:id", updateProdPartially);
router.delete("/deleteProduct/:id", deleteProduct);
module.exports = router;

// const express = require("express");
// const {
//   products,
//   productById,
//   addProduct,
//   updateProduct,
//   updateProdPartially,
//   deleteProduct,
// } = require("../controllers/productController");
// const authenticationToken = require("../middleware/productMiddleware");

// const router = express.Router();

// /**
//  * @swagger
//  * /api/products:
//  *   get:
//  *     summary: Get all products
//  *     security:
//  *       - BearerAuth: []
//  *     tags:
//  *       - Products
//  *     responses:
//  *       200:
//  *         description: List of products
//  */
// router.get("/products", authenticationToken, products);

// /**
//  * @swagger
//  * /api/productId/{id}:
//  *   get:
//  *     summary: Get product by ID
//  *     tags:
//  *       - Products
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The product ID
//  *     responses:
//  *       200:
//  *         description: Product details
//  */
// router.get("/productId/:id", productById);

// /**
//  * @swagger
//  * /api/addProduct:
//  *   post:
//  *     summary: Add a new product
//  *     tags:
//  *       - Products
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               description:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Product added successfully
//  */
// router.post("/addProduct", addProduct);

// /**
//  * @swagger
//  * /api/updateProduct/{id}:
//  *   put:
//  *     summary: Update a product
//  *     tags:
//  *       - Products
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The product ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               description:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Product updated successfully
//  */
// router.put("/updateProduct/:id", updateProduct);

// /**
//  * @swagger
//  * /api/partialUpdate/{id}:
//  *   patch:
//  *     summary: Partially update a product
//  *     tags:
//  *       - Products
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The product ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               price:
//  *                 type: number
//  *     responses:
//  *       200:
//  *         description: Product partially updated
//  */
// router.patch("/partialUpdate/:id", updateProdPartially);

// /**
//  * @swagger
//  * /api/deleteProduct/{id}:
//  *   delete:
//  *     summary: Delete a product
//  *     tags:
//  *       - Products
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The product ID
//  *     responses:
//  *       200:
//  *         description: Product deleted successfully
//  */
// router.delete("/deleteProduct/:id", deleteProduct);

// module.exports = router;
