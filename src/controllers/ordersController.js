async function order(req, res) {
  try {
    const { address, shippingFee, uid } = req.body;
  } catch (error) {
    console.log(error);
  }
}
module.exports = order;
