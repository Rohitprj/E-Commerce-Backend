async function order(req, res) {
  try {
    const { address, shippingFee } = req.body;
  } catch (error) {
    console.log(error);
  }
}
