const {
  addToWishlist,
  getWishlistData,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = require("express").Router();

router.post("/addToWishlist", addToWishlist);
router.get("/getWishlistData/:id", getWishlistData);
router.delete("/removeFromWishlist", removeFromWishlist);

module.exports = router;
