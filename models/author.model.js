const pool = require("../config/db");

let checkId = (id) => {
  if (isNaN(id)) throw new Error("Id is invalid!");
};

const Author = {
  findAll: async function () {
    try {
      let query = "SELECT * from authors;";
      return await pool.query(query);
    } catch (error) {
      console.log("Db error in query:", error, query);
      throw error;
    }
  },
  findById: async function (id) {
    checkId(id);
    try {
      let query = "SELECT * from authors where id = $1";
      return await pool.query(query, [id]);
    } catch (error) {
      console.log("Db error in query:", error, query);
      throw error;
    }
  },
  updateById: async function (id, data) {
    checkId(id);
    let fields = Object.keys(data);
    let values = Object.values(data);
    if (!fields.length) throw new Error("No fields to update!");
    let updateFields = fields
      .map((field, idx) => `${field} = $${idx + 1}`)
      .join(", ");
    values.push(id);
    let query = `UPDATE authors SET ${updateFields} WHERE id = ${
      values.length + 1
    } RETURNING *`;
    try {
      return await pool.query(query, values);
    } catch (error) {
      console.log("Db error in query:", error, query);
      throw error;
    }
  },
  deleteById: async function (id) {
    try {
      checkId(id);
      let query = "DELETE FROM authors WHERE id = $1 returning *";
      return await pool.query(query, [id]);
    } catch (error) {
      console.log("Db error in query:", error, query);
      throw error;
    }
  },
  create: async function (data) {
    let requiredFields = ["name", "email", "active", "bio"];

    for (let i of requiredFields) {
      if (!data[i]) throw new Error(`Field "${i}" is missing!`);
    }
    let values = Object.values(data);
    let keys = Object.keys(data);

    let placeHolders = keys.map((f, idx) => `$${idx + 1}`).join(", ");
    //just added a try catch to catch these error to help debugging really correctly!
    let query = `INSERT INTO authors (${keys.join(
      ", "
    )}) values (${placeHolders}) returning *`;
    try {
      return await pool.query(query, values);
    } catch (error) {
      console.log("Db error in query:", error, query);
      throw error;
    }
  },
};

module.exports = Author;
