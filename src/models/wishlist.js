const mongoose = require("mongoose");
const { Types, Schema } = mongoose;

const wishlistItemSchema = new Schema(
  {
    _id: { type: Types.ObjectId, ref: "products", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    _id: false,
  }
);
const wishlistSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "user", required: true },
    productId: { type: [wishlistItemSchema], ref: "product", default: [] },
  }
  // { _id: false }
);

const Wishlist = mongoose.model("wishlists", wishlistSchema);

module.exports = Wishlist;
