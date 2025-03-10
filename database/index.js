const mongoose = require("mongoose");

const dbConnection = (connectionStr) => {
  return mongoose.connect(connectionStr);
};

module.exports = dbConnection;
