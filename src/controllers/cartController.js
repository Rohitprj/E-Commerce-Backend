const SignUp = require("../models/authSchema");
const Products = require("../models/productSchema");
const CreateCart = require("../models/cartSystemSchema");

async function cartSystem(req, res) {
  try {
    const { userId, prodId, quantity = 1 } = req.body;
    // Validation user existence
    const userIdExists = await SignUp.exists({ _id: userId });
    if (!userIdExists) {
      return res.status(404).json({
        message: "Can't make cart your user ID does not exist signUp first",
      });
    }
    // Validation product existance
    const prodIdExists = await Products.findOne({ _id: prodId });
    if (!prodIdExists) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    let cart = await CreateCart.findOne({ userId });
    if (!cart) {
      cart = new CreateCart({
        userId: userId,
        item: [{ prodId, quantity }],
      });
      await cart.save();
    }
    return res.status(200).json({
      message: "user id && product exists",
      data: prodIdExists,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error !" });
    console.log(error);
  }
}
module.exports = { cartSystem };

// const Cart = require("../models/cartSchema");
// const Products = require("../models/productSchema");

// async function addToCart(req, res) {
//   try {
//     const { product_id, quantity } = req.body;

//     if (!product_id || !quantity) {
//       return res
//         .status(400)
//         .json({ message: "Product ID and quantity are required!" });
//     }

//     const product = await Products.findOne({ product_id });
//     console.log("Product found:", product);

//     if (!product) {
//       return res.status(400).json({ message: "Product doesn't exist!" });
//     }
//     let cart = await Cart.findOne();

//     if (!cart) {
//       cart = new Cart({ item: [] });
//     }
//     const cartProdExisting = cart.item.find((data) => {
//       data.product_id.toString() === product_id;
//     });

//     if (cartProdExisting) {
//       cartProdExisting.quantity += quantity;
//     } else {
//       cart.item.push();
//     }
//     await cart.save();

//     res.status(201).json({
//       message: "Added to cart successfully",
//       data: cart,
//     });
//   } catch (error) {
//     console.error("Error in addToCart:", error.message);
//     return res
//       .status(500)
//       .json({ message: "Server error!", error: error.message });
//   }
// }

// module.exports = { addToCart };

// const Cart = require("../models/cartSchema");
// const Products = require("../models/productSchema");

// async function addToCart(req, res) {
//   try {
//     const { product_id, quantity } = req.body;

//     if (!product_id || !quantity) {
//       return res
//         .status(400)
//         .json({ message: "Product ID and quantity are required!" });
//     }

//     const product = await Products.findOne({ product_id });
//     console.log("Product found:", product);

//     if (!product) {
//       return res.status(400).json({ message: "Product doesn't exist!" });
//     }

//     const productWithQuantity = { ...product.toObject(), quantity };

//     const addCart = new Cart({
//       item: [productWithQuantity],
//     });
//     console.log("Data", addCart);

//     await addCart.save();

//     res.status(201).json({
//       message: "Added to cart successfully",
//       data: addCart,
//     });
//   } catch (error) {
//     console.error("Error in addToCart:", error.message);
//     return res
//       .status(500)
//       .json({ message: "Server error!", error: error.message });
//   }
// }

// module.exports = { addToCart };

// Aggregation commands :- Match lookup unwind group project sort limit skip count sum multiply addfeilds replaceRoute facet bucket bucketAuto merge
// tax price discount prodId quantity
