const express = require("express");
const pessoas = require("./pessoasRoute");
const niveis = require("./niveisRoute");
const turmas = require("./turmasRoute");

module.exports = () => {
  const app = express();

  app.use(express.json(), pessoas, niveis, turmas);

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  return app;
};
