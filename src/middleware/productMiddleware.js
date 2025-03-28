const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(500)
      .json({ message: "Access denied. No token provided !" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authenticationToken;
