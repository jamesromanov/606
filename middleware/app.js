const express = require("express");
const error = require("../utils/error");
const bookRouter = require("../routes/books.router");
const authorRouter = require("../routes/author.router");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger.js");

const app = express();
app.use(express.json());
app.use(error);
app.use("/api/books", bookRouter);
app.use("/api/author", authorRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = app;
