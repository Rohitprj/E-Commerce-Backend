const Wishlist = require("../models/wishlist");

// Add to Wishlist
async function addToWishlist(req, res) {
  const { userId, productId } = req.body;

  try {
    let wishlistData = await Wishlist.findOne({ userId });

    if (!wishlistData) {
      wishlistData = new Wishlist({ userId, products: [productId] });
    } else {
      if (!wishlistData.products.includes(productId)) {
        wishlistData.products.push(productId);
      }
    }

    await wishlistData.save();
    res.status(200).json({ success: true, wishlist: wishlistData });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get Wishlist Data
async function getWishlistData(req, res) {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId }).populate("products");

    if (!wishlist) {
      return res.status(200).json({ success: true, products: [] });
    }

    res.status(200).json({ success: true, products: wishlist.products });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

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

module.exports = { addToWishlist, getWishlistData, removeFromWishlist };
