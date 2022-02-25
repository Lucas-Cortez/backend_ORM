const express = require("express");
const pessoas = require("./pessoasRoute");
const niveis = require("./niveisRoute");
const turmas = require("./turmasRoute");

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use("/pessoas", pessoas);
  app.use("/niveis", niveis);
  app.use("/turmas", turmas);

  return app;
};
