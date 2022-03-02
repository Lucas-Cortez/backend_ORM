const database = require("../models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAll(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getOne(where = {}) {
    return database[this.modelName].findOne({ where: { ...where } });
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

  async restore(where) {
    return database[this.modelName].restore({ where: { ...where } });
  }

  async delete(id) {
    return database[this.modelName].destroy({ where: { id: id } });
  }

  async deleteMany(where = {}) {
    return database[this.modelName].destroy({ where: { ...where } });
  }

  async findAndCount(where, params = {}) {
    return database[this.modelName].findAndCountAll({
      ...params,
      where: { ...where },
    });
  }
}

module.exports = Services;
