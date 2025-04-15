const express = require("express");
const bookController = require("../controllers/books.controller");
const authorRouter = express.Router();
/**
 * @swagger
 * /api/author/{id}/books:
 *   get:
 *     summary: Returns specific author with their books
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the author
 *     responses:
 *       200:
 *         description: The list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

authorRouter.route("/:id/books").get(bookController.findByAuthorId);
module.exports = authorRouter;
