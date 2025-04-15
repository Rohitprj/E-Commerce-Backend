const rateLimit = require("express-rate-limit");

const logInLimiter = rateLimit({
  windowsMs: 15 * 60 * 1000, // for 15 minutes
  max: 7, // max 7 attempts
  message: "Too many login attempts from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Allow 10 signups per IP per hour
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

module.exports = { logInLimiter, signupLimiter };
