const express = require("express");
const bookController = require("../controllers/books.controller");

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(bookController.getBooks)
  .post(bookController.addBooks);
bookRouter
  .route("/:id")
  .put(bookController.updateBookById)
  .delete(bookController.deleteBookById);
module.exports = bookRouter;
