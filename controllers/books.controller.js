const { response } = require("../utils/response");
const Book = require("../models/books.model");
const errorHandler = require("../utils/errorHandler");
const Joi = require("joi");

let idValidator = Joi.number().min(1).required();
const joiValidator = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  author_id: Joi.number().min(1).required(),
  published_year: Joi.date().required(),
});

const getBooks = errorHandler(async (req, res, next) => {
  let books = await Book.getBooksByAuthor();
  response(res, books.rows);
});

const findByAuthorId = errorHandler(async (req, res, next) => {
  const { error, value: id } = idValidator.validate(req.params.id);
  if (error) return response(res, "Id is invalid!", 400);

  let author = await Book.getAuthorBooks(id);
  if (!author.rows.length) return response(res, "No authors found!", 404);
  response(res, author.rows);
});
const addBooks = errorHandler(async (req, res, next) => {
  let { error, value: data } = joiValidator.validate(req.body);
  if (error) return response(res, error.details[0].message, 400);

  let user = await Book.create(data);

  response(res, user.rows, 201);
});

const updateBookById = errorHandler(async (req, res, next) => {
  let { error, value: id } = idValidator.validate(req.params.id);
  if (error) return response(res, "Id is invalid!", 400);
  let updateFields = {};

  let bookExist = await Book.findById(id);
  if (!bookExist.rows.length) return response(res, "No user found!", 404);

  if (req.body.title) updateFields["title"] = req.body.title;
  if (req.body.published_year)
    updateFields["published_year"] = req.body.published_year;
  if (req.body.author_id) updateFields["author_id"] = req.body.author_id;

  if (Object.keys(updateFields).length === 0)
    return response(res, "No data to update!", 400);

  let book = await Book.updateById(id, updateFields);
  response(res, book.rows, 200);
});

const deleteBookById = errorHandler(async (req, res, next) => {
  let { error, value: id } = idValidator.validate(req.params.id);
  if (error) return response(res, "Id is invalid!", 400);
  const bookExist = await Book.findById(id);
  if (!bookExist.rows.length)
    return response(res, "Book not found or already deleted!", 404);

  await Book.deleteById(id);
  response(res, null, 204);
});

module.exports = {
  deleteBookById,
  updateBookById,
  addBooks,
  getBooks,
  findByAuthorId,
};
