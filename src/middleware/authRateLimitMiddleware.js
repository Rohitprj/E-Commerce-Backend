const rateLimit = require("express-rate-limit");

const logInLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // for 15 minutes
  max: 20, // max 20 attempts
  message: "Too many login attempts from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip, // safe usage with proper trust proxy setting
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Allow 10 signups per IP per hour
  message:
    "Too many accounts created from this IP, please try again after an hour",
  keyGenerator: (req) => req.ip, // safe usage with proper trust proxy setting
});

module.exports = { logInLimiter, signupLimiter };
