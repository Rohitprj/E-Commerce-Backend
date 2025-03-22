const SignUp = require("../models/authSchema");
const Products = require("../models/productSchema");
const { CreateCart } = require("../models/cartSystemSchema");

async function cartSystem(req, res) {
  try {
    const { userId, prodId } = req.body;
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
    console.log(`price: ${prodIdExists.price}`);
    console.log(`name: ${prodIdExists.name}`);

    let cart = await CreateCart.findOne({ _id: userId });
    if (!cart) {
      cart = new CreateCart({
        _id: userId,
        item: [
          {
            _id: prodId,
            name: prodIdExists.name,
            quantity: 1,
            price: prodIdExists.price,
          },
        ],
      });
      await cart.save();
    } else {
      const existingItem = cart.item.findIndex(
        (item) => item._id.toString() === prodId
      );

      console.log(existingItem);

      if (!(existingItem !== -1)) {
        const resp = await CreateCart.findOneAndUpdate(
          { _id: userId, "item._id": prodId },
          {
            $inc: {
              "item.$.quantity": 1,
            },
          },
          { new: true }
        ).lean();
        console.log("Items", { resp: resp.item });
      } else {
        console.log("I WAS CALLED WHEN NEW ITEM PUSHED!");
        // tax discount total subtotal prodId price quantity name
        const pushItem = await CreateCart.findOneAndUpdate(
          { _id: userId },
          [
            {
              $addFields: {
                item: {
                  $concatArrays: [
                    "$item",
                    [
                      {
                        _id: prodId,
                        name: prodIdExists.name,
                        quantity: 1,
                        price: prodIdExists.price,
                      },
                    ],
                  ],
                },
              },
            },

            {
              $set: {
                subtotal: 500,
              },
            },
          ],
          { new: true }
        ).lean();
        console.log("pushItem", pushItem);
      }
    }

    return res.status(200).json({
      message: "user id && product exists",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error !" });
    console.log(error);
  }
}
module.exports = { cartSystem };
