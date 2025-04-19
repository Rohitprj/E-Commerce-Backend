const express = require("express");
const { signUp, logIn } = require("../controllers/authController");
const {
  signUpValidation,
  logInValidation,
} = require("../middleware/authMiddleware");
const {
  logInLimiter,
  signupLimiter,
} = require("../middleware/authRateLimitMiddleware");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const router = express.Router();
router.post("/signUp", signUpValidation, signupLimiter, signUp);
router.post("/logIn", logInValidation, logInLimiter, logIn);
router.post("/tokenRefresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No token found" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });

    const newAccessToken = jwt.sign(
      { _id: decoded._id, email: decoded.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    console.log("first", newAccessToken);
    res.json({
      accessToken: newAccessToken,
      user: { _id: decoded._id, email: decoded.email },
    });
  });
});

router.get("/is_loggedin", (req, res) => {
  try {
    const cookies = req.cookies;
    const cookie = cookies.refreshToken;

    if (!cookie) {
      return res.json({
        is_loggedin: false,
      });
    }

    console.log({ cookies });

    const data = jwt.verify(cookie, process.env.REFRESH_TOKEN);

    console.log(data);

    res.json({
      is_loggedin: true,
      data: {
        email: data.email,
        expiry: data.exp,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      is_loggedin: false,
    });
  }
});

module.exports = router;

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The unique ID of the user.
//  *         email:
//  *           type: string
//  *           description: The email of the user.
//  *         password:
//  *           type: string
//  *           description: The hashed password of the user.
//  *         refreshToken:
//  *           type: string
//  *           description: The refresh token for authentication.
//  *       example:
//  *         id: "65a1b2c3d4e5f6g7h8i9"
//  *         email: "user@example.com"
//  *         password: "$2a$10$encryptedpassword"
//  *         refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

//  *     AuthResponse:
//  *       type: object
//  *       properties:
//  *         message:
//  *           type: string
//  *           example: "Login successfully"
//  *         success:
//  *           type: boolean
//  *           example: true
//  *         accessToken:
//  *           type: string
//  *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//  *         refreshToken:
//  *           type: string
//  *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

//  *     Product:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: string
//  *         name:
//  *           type: string
//  *         price:
//  *           type: number
//  *       example:
//  *         id: "prod123"
//  *         name: "Laptop"
//  *         price: 1200
//  */

// /**
//  * @swagger
//  * /auth/signUp:
//  *   post:
//  *     summary: Register a new user
//  *     tags : ["User"]
//  *     description: Creates a new user account.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'
//  *     responses:
//  *       201:
//  *         description: User registered successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "User registered successfully"
//  *       400:
//  *         description: User already exists.
//  *       500:
//  *         description: Server error.
//  */
// router.post("/signUp", signUpValidation, signUp);

// /**
//  * @swagger
//  * /auth/logIn:
//  *   post:
//  *     summary: Log in a user
//  *     tags : ["User"]
//  *     description: Authenticates a user and returns access and refresh tokens.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "user@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       200:
//  *         description: Login successful.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/AuthResponse'
//  *       400:
//  *         description: Invalid credentials or user not found.
//  *       500:
//  *         description: Server error.
//  */
// router.post("/logIn", logInValidation, logIn);

// module.exports = router;
