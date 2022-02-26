const database = require("../models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAll(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getOne(id) {
    return database[this.modelName].findOne({ where: { id: id } });
  }

  async create(data) {
    return database[this.modelName].create(data);
  }

  async update(data, id, transaction = {}) {
    return database[this.modelName].update(
      data,
      {
        where: {
          id: id,
        },
      },
      transaction
    );
  }

  async updateMany(data, where, transaction = {}) {
    return database[this.modelName].update(
      data,
      {
        where: {
          ...where,
        },
      },
      transaction
    );
  }

  async delete(id) {
    return database[this.modelName].destroy({ where: { id: id } });
  }
}

module.exports = Services;
