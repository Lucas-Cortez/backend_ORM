const Services = require("./Services");
const database = require("../models");

class PeopleServices extends Services {
  constructor() {
    super("Pessoas");
    this.Matriculas = new Services("Matriculas");
  }

  async getActive(where = {}) {
    return database[this.modelName].findAll({ where: { ...where } });
  }

  async getAllRecords(where = {}) {
    return database[this.modelName].scope("all").findAll({ where: { ...where } });
  }

  async cancelPersonRegistration(studentId) {
    database.sequelize.transaction(async (t) => {
      await super.update({ ativo: false }, studentId, { transaction: t });
      await this.Matriculas.update(
        { status: "cancelado" },
        {
          estudante_id: parseInt(studentId),
        },
        { transaction: t }
      );
    });
  }
}
module.exports = { PeopleServices };
