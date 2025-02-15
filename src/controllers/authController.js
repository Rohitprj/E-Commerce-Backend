const SignUp = require("../models/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const { email, password } = req.body;

    const existingUser = await SignUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password", hashedPassword);

    const newUser = new SignUp({ email, password: hashedPassword });

    const result = await newUser.save();
    console.log(result);

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
    console.log(e);
  }
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const registered = await SignUp.findOne({ email });

    if (!registered) {
      return res.status(400).json({ message: "SignUp first" });
    }

    const isMatch = await bcrypt.compare(password, registered.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      { email: registered.email, _id: registered._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        email: registered.email,
        _id: registered._id,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "14d" }
    );

    registered.refreshToken = refreshToken;
    await registered.save();

    res.status(200).json({
      message: "Login successfully",
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
    console.log(e);
  }
}

module.exports = { signUp, logIn };
