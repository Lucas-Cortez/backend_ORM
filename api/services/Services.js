const database = require("../models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAll() {
    return database[this.modelName].findAll();
  }

  async getOne(id) {
    return database[this.modelName].findOne();
  }

  async create(data) {
    return database[this.modelName].create();
  }

  async update(data, id) {
    return database[this.modelName].update();
  }

  async delete(id) {
    return database[this.modelName].destroy();
  }
}

module.exports = Services;
