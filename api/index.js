// const express = require("express");
console.clear();
const routes = require("./routes");
const PORT = 8080;

const app = routes();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}...`);
});

module.exports = app;
