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

  async update(data, id, transaction = {}) {
    return database[this.modelName].update(data, {
      where: {
        id: id,
      },
      transaction,
    });
  }

  async updateMany(data, where, transaction = {}) {
    return database[this.modelName].update(data, {
      where: {
        ...where,
      },
      transaction,
    });
  }

  async delete(id) {
    return database[this.modelName].destroy();
  }
}

module.exports = Services;
