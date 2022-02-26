// const { Op } = require("sequelize");
// const database = require("../models");

const { ClassServices } = require("../services");
const classServices = new ClassServices("Turmas");

class TurmaController {
  static async listAllClasses(req, res) {
    const dates = req.query;

    try {
      const todasAsTurmas = await classServices.getClassWithDate(dates);
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listClass(req, res) {
    const { id } = req.params;

    try {
      const umaTurma = await classServices.getOne(parseInt(id));
      return res.status(200).json(umaTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createClass(req, res) {
    const novaTurma = req.body;
    try {
      const novaTurmaCriada = await classServices.create(novaTurma);
      return res.status(200).json(novaTurmaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateClass(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await classServices.update(novasInfos, parseInt(id));
      const turmaAtualizada = await classServices.getOne(parseInt(id));
      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteClass(req, res) {
    const { id } = req.params;
    try {
      await classServices.delete(parseInt(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = TurmaController;
