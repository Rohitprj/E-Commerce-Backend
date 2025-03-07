const { Types } = require("mongoose");
const SignUp = require("../models/authSchema");
const Products = require("../models/productSchema");

async function cartSystem(req, res) {
  try {
    const { userId, prodId } = req.body;

    const userIdExists = SignUp.exists({ _id: userId }).lean();
    if (!userIdExists) {
      return res.send({ message: "user id not exists" });
    }

    const prodIdExists = Products.findById(prodId).lean();
    if (!prodIdExists) {
      return res.send({ message: "Product not exists" });
    }

    console.log("Products", prodIdExists);
    return res.send({ message: "user id && product exists" });
  } catch (error) {
    res.send({ message: "Server error !" });
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
