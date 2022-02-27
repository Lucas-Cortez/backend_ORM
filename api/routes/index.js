const express = require("express");
require("express-async-errors");
const people = require("./peopleRoute");
const levels = require("./levelsRoute");
const classes = require("./classRoute");
const { errorHandler } = require("../middlewares");

module.exports = () => {
  const app = express();

  app.use(express.json());

  app.use("/pessoas", people);
  app.use("/niveis", levels);
  app.use("/turmas", classes);

  app.use(errorHandler);
  return app;
};
