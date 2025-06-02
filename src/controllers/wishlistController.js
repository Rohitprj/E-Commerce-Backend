const mongoose = require("mongoose");
const { Types, Schema } = mongoose;
const SignUp = require("../models/authSchema");
const Products = require("../models/productSchema");
const Wishlist = require("../models/wishlist");

// Add to Wishlist
// async function addToWishlist(req, res) {
//   try {
//     const { userId, prodId } = req.body;
//     const userExists = await SignUp.exists({ _id: userId });
//     if (!userExists) {
//       return res.status(404).json({ message: "Login to see Wishlist" });
//     }
//     const productExists = await Products.findOne({ _id: prodId });
//     if (!productExists) {
//       return res.status(404).json({ message: "Product not exists" });
//     }
//     let wishlist = await Wishlist.findOne({ _id: userId });
//     if (!wishlist) {
//       wishlist = new Wishlist({
//         _id: userId,
//         items: [
//           {
//             _id: prodId,
//             name: productExists.name,
//             price: productExists.price,
//             image: productExists.image,
//           },
//         ],
//       });
//       await wishlist.save();
//     } else {
//       // Check if the product already exists in the wishlist
//       const existingItem = wishlist.items.some(
//         (item) => item._id.toString() === prodId
//       );
//       if (existingItem) {
//         return res
//           .status(200)
//           .json({ message: "Product already in wishlist", data: wishlist });
//       }
//       // if product doesnt exist in the wishlist, add it in it
//       wishlist.items.push({
//         _id: prodId,
//         name: productExists.name,
//         price: productExists.price,
//         image: productExists.image,
//       });
//       await wishlist.save();
//     }
//     return res.status(200).json({
//       message: "Wishlist Updated",
//       data: wishlist,
//     });
//   } catch (error) {
//     console.error("Add to wishlist error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// }
async function addToWishlist(req, res) {
  try {
    const { userId, prodId } = req.body;
    const userExists = await SignUp.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: "Login to see Wishlist" });
    }
    const productExists = await Products.findOne({ _id: prodId });
    if (!productExists) {
      return res.status(404).json({ message: "Product not exists" });
    }
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        userId: userId,
        productId: [
          {
            _id: prodId,
            name: productExists.name,
            price: productExists.price,
            image: productExists.image,
          },
        ],
      });
      await wishlist.save();
    } else {
      // Check if the product already exists in the wishlist
      const existingItem = wishlist.productId.some(
        (item) => item._id.toString() === prodId
      );
      if (existingItem) {
        return res
          .status(200)
          .json({ message: "Product already in wishlist", data: wishlist });
      }
      // if product doesnt exist in the wishlist, add it in it
      wishlist.productId.push({
        _id: prodId,
        name: productExists.name,
        price: productExists.price,
        image: productExists.image,
      });
      await wishlist.save();
    }
    return res.status(200).json({
      message: "Wishlist Updated",
      data: wishlist,
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get Wishlist Data

async function getWishlistData(req, res) {
  const { userId } = req.params;
  try {
    if (!Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }
    const wishlist = await Wishlist.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (!wishlist) {
      return res.status(200).json({ success: true, products: [] });
    }
    res.status(200).json({ success: true, products: wishlist.productId });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
// async function getWishlistData(req, res) {
//   const { userId } = req.params;
//   try {
//     console.log("UserId", userId);
//     const wishlist = await Wishlist.findOne({
//       userId: new Types.ObjectId(userId),
//     });
//     console.log("Wishlist", wishlist);
//     if (!wishlist) {
//       return res.status(200).json({ success: true, products: [] });
//     }
//     res.status(200).json({ success: true, products: wishlist.productId });
//   } catch (error) {
//     console.error("Error fetching wishlist:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// }

// Remove from Wishlist
async function removeFromWishlist(req, res) {
  const { userId, productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
// COPILOT'S LOGIC

// async function removeFromWishlist(req, res) {
//   const { userId, productId } = req.body;
//   try {
//     const wishlist = await Wishlist.findOne({ userId });
//     if (!wishlist) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Wishlist not found" });
//     }
//     wishlist.productId = wishlist.productId.filter(
//       (item) => item._id.toString() !== productId
//     );
//     await wishlist.save();
//     res.status(200).json({ success: true, wishlist });
//   } catch (error) {
//     console.error("Remove from wishlist error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// }

module.exports = { addToWishlist, getWishlistData, removeFromWishlist };
