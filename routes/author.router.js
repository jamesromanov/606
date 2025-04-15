const express = require("express");
const bookController = require("../controllers/books.controller");
const authorRouter = express.Router();
/**
 * @swagger
 * /{id}/books:
 *  get:
 *    summary: Returns specific author with their books
 *    tags: [Books]
 *     responses:
 *       200:
 *       description: the list of all books
 *        content:
 *           application/json:
 *               schema:
 *                  type: array
 *                  items :
 *                     $ref: $#components/schema/Book
 * **/
authorRouter.route("/:id/books").get(bookController.findByAuthorId);
module.exports = authorRouter;
