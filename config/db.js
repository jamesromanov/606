require("dotenv").config();
const { Pool } = require("pg");

let pool = new Pool({
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
