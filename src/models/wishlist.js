const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const Wishlist = mongoose.model("wishlists", wishlistSchema);

module.exports = Wishlist;
