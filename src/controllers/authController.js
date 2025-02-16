const SignUp = require("../models/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const useragent = require("user-agent");
const UAParser = require("ua-parser-js");

async function signUp(req, res) {
  try {
    const { email, password } = req.body;

    // Ensure user-agent header exists
    const userAgentHeader = req.headers["user-agent"] || "Unknown";

    // Use UAParser to extract device and OS information
    const parser = new UAParser(userAgentHeader);
    const os = parser.getOS().name || "Unknown OS";
    const device =
      parser.getDevice().model || parser.getBrowser().name || "Unknown Device";
    const deviceId = `${os} - ${device}`;

    // Get IP address
    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      "Unknown IP";

    // Check if user exists
    const existingUser = await SignUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user with additional fields
    const newUser = new SignUp({
      email,
      password: hashedPassword,
      deviceId,
      ipAddress,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", deviceId, ipAddress });
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

    res.status(201).json({
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
