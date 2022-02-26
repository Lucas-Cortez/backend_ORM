const Services = require("./Services");
// const database = require("../models");
const { Op } = require("sequelize");

class ClassServices extends Services {
  constructor() {
    super("Turmas");
  }

  async getClassWithDate(dates) {
    const { data_inicial, data_final } = dates;
    console.log(data_inicial);
    console.log(data_final);

    const where = {};

    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    return super.getAll(where);
  }
}
module.exports = ClassServices;
