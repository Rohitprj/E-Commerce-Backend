const SignUp = require("../models/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const { email, password } = req.body;

    const ipAdd = req.headers["x-forwarded-for"] || req.ip;
    const userAgent = req.headers["user-agent"];
    console.log("IpAddress", ipAdd);
    console.log("Agent", userAgent);
    const existingUser = await SignUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = jwt.sign(
      { email: email, _id: email._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        email: email,
        _id: email._id,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    const newUser = new SignUp({
      email,
      password: hashedPassword,
      accessToken,
      refreshToken,
    });
    await newUser.save();

    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User registered successfully",
        accessToken,
        data: { _id: newUser._id, email: newUser.email },
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
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
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      {
        email: registered.email,
        _id: registered._id,
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    registered.refreshToken = refreshToken;
    await registered.save();

    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successfully",
        success: true,
        accessToken,
        user: {
          _id: registered._id,
          email: registered.email,
        },
      });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
    console.log(e);
  }
}

module.exports = { signUp, logIn };
