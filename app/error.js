const error = require("../utils/error");

const notFoundHandler = (_req, _res, next) => {
  error("Not found!", 404);
  next();
};

const errorHandler = (error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Server error!";

  res.status(errorStatus).json({
    success: false,
    message: errorMessage,
  });
};

module.exports = { notFoundHandler, errorHandler };
