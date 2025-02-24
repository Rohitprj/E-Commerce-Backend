const Cart = require("../models/cartSchema");
const Products = require("../models/productSchema");

async function addToCart(req, res) {
  try {
    const { product_id, name, category, image, price, quantity } = req.body;
    const productId = await Products.findOne({
      product_id,
    });
    if (!productId) {
      return res.status(400).json({ message: "Product don't exists !" });
    }
    const addCart = new Cart(
      {
        product_id,
        name,
        category,
        image,
        price,
        quantity,
      },
      { new: true }
    );
    await addCart.save();
    res
      .status(201)
      .json({ message: "Add to cart successfully", data: addCart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error !" });
  }
}
module.exports = { addToCart };
