const express = require("express");
const { connectDB } = require("./src/config/connectDB");
const authRoute = require("./src/routes/authRoute");
const categoriesRoute = require("./src/routes/categoriesRoute");
const bodyParser = require("body-parser");
const swaggerDocs = require("./swagger");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(express.json());

swaggerDocs(app);

const PORT = process.env.PORT || 3009;

connectDB();

app.use("/auth", authRoute);
app.use("/categories", categoriesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
