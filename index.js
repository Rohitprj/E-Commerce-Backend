const express = require("express");
const { connectDB } = require("./src/config/connectDB");
const authRoute = require("./src/routes/authRoute");
const categoriesRoute = require("./src/routes/categoriesRoute");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for E-commerce app",
    },
    servers: [{ url: "http://localhost:3009" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/categoriesRoute.js", "./src/routes/authRoute.js"],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

app.use(express.json());

const PORT = process.env.PORT || 3009;

connectDB();

app.use("/auth", authRoute);
app.use("/categories", categoriesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
