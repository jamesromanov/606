const { response } = require("../utils/response");

const error = (err, req, res, next) => {
  response(res, "Middleware error: " + err.message, 500);
};

module.exports = error;
