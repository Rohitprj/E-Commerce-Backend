// const express = require("express");
// const router = express.Router();

// const {
//   allCategories,
//   createCategory,
//   getCategoryById,
//   updateCategoryById,
//   deleteCategoryById,
// } = require("../controllers/categoriesController");

// router.get("/allCategories", allCategories);
// router.post("/createCategory", createCategory);
// router.get("/getCategoryById/:id", getCategoryById);
// router.patch("/updateCategoryById/:id", updateCategoryById);
// router.delete("/deleteCategoryById/:id", deleteCategoryById);
// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  allCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoriesController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - description
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 *         slug:
 *           type: string
 *           description: A unique slug for the category.
 *         description:
 *           type: string
 *           description: A brief description of the category.
 *         image:
 *           type: string
 *           description: URL of the category image.
 *       example:
 *         id: "65a1b2c3d4e5f6g7h8i9"
 *         name: "Electronics"
 *         slug: "electronics"
 *         description: "All electronic items"
 *         image: "https://example.com/category-image.jpg"
 */

/**
 * @swagger
 * /categories/allCategories:
 *   get:
 *     summary: Get all categories
 *     tags : ["Categories"]
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: Successfully retrieved categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/allCategories", allCategories);

/**
 * @swagger
 * /categories/createCategory:
 *   post:
 *     summary: Create a new category
 *     tags : ["Categories"]
 *     description: Add a new category to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.post("/createCategory", createCategory);

/**
 * @swagger
 * /categories/getCategoryById/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags : ["Categories"]
 *     description: Retrieve details of a specific category using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the category.
 *     responses:
 *       200:
 *         description: Successfully retrieved category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 */
router.get("/getCategoryById/:id", getCategoryById);

/**
 * @swagger
 * /categories/updateCategoryById/{id}:
 *   patch:
 *     summary: Update category by ID
 *     tags : ["Categories"]
 *     description: Update category details using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 */
router.patch("/updateCategoryById/:id", updateCategoryById);

/**
 * @swagger
 * /categories/deleteCategoryById/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags : ["Categories"]
 *     description: Remove a category from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the category to delete.
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 */
router.delete("/deleteCategoryById/:id", deleteCategoryById);

module.exports = router;
