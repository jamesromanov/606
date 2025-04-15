const pool = require("../config/db");

const checkId = (id) => {
  if (!id || isNaN(id)) throw new Error("Invalid id!");
};
const Book = {
  getBooksByAuthor: async function () {
    let query =
      "select books.title as books, authors.name as name from books join authors on books.author_id = authors.id";
    return await pool.query(query);
  },
  getAuthorBooks: async function (author_id) {
    let query =
      " SELECT authors.name as author, books.title as book from books join authors on books.author_id = authors.id where books.author_id = $1;";
    return await pool.query(query, [author_id]);
  },
  findAll: async function () {
    try {
      let query = "SELECT * from books;";
      return await pool.query(query);
    } catch (error) {
      console.error("Db error in query", query, error);
      throw error;
    }
  },
  findById: async function (id) {
    checkId(id);
    try {
      let query = "SELECT * from books where id = $1";
      return await pool.query(query, [id]);
    } catch (error) {
      console.error("db error in query:", query, error);
      throw error;
    }
  },
  updateById: async function (id, data) {
    checkId(id);
    let fields = Object.keys(data);
    let values = Object.values(data);

    if (!data || !fields.length)
      throw new Error("No fields provided to update!");
    let placeHolders = fields
      .map((field, idx) => `${field}=$${idx + 1}`)
      .join(", ");
    values.push(id);
    let query = `UPDATE books SET ${placeHolders} where id = $${
      fields.length + 1
    } returning *`;
    try {
      return await pool.query(query, values);
    } catch (error) {
      console.error("db error at query:", query, error);
      throw error;
    }
  },
  create: async function (data) {
    if (!data) throw new Error("Nothing to add!");
    let requiredFields = ["title", "author_id", "published_year"];

    for (let field of requiredFields) {
      if (!data[field]) throw new Error(`Field ${field} is missing!`);
    }

    let fields = Object.keys(data);
    let values = Object.values(data);

    let placeHolders = fields.map((f, idx) => `$${idx + 1}`).join(", ");
    try {
      let query = `insert into books (${fields.join(
        ", "
      )}) values(${placeHolders}) returning *`;
      return await pool.query(query, values);
    } catch (error) {
      console.error("db error in query:", "query", error);
      throw error;
    }
  },
  deleteById: async function (id) {
    checkId(id);
    try {
      let query = "DELETE FROM books where id = $1 returning *";
      return await pool.query(query, [id]);
    } catch (error) {
      console.error("db error in query:", query, error);
      throw error;
    }
  },
};

module.exports = Book;
