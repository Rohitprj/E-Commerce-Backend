const express = require("express");
const { connectDB } = require("./src/config/connectDB");
const authRoute = require("./src/routes/authRoute");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(express.json());

const PORT = process.env.PORT || 3009;

connectDB();

app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
