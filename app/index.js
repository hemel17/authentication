const express = require("express");
const middleware = require("./middleware");
const route = require("./route");
const { notFoundHandler, errorHandler } = require("./error");
const app = express();

// * middleware
app.use(middleware);

// * routes
app.use(route);

// * error
app.use([notFoundHandler, errorHandler]);

module.exports = app;
