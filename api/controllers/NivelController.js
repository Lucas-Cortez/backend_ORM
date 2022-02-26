const database = require("../models");

const Services = require("../services/Services");
const levelServices = new Services("Niveis");

class NivelController {
  static async listAllLevels(req, res) {
    try {
      const todosOsNiveis = await levelServices.getAll();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listLevel(req, res) {
    const { id } = req.params;
    try {
      const oneLevel = await levelServices.getOne(parseInt(id));
      return res.status(200).json(oneLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createLevel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await levelServices.create(novoNivel);
      return res.status(200).json(novoNivelCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateLevel(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;

    try {
      await levelServices.update(novasInfos, parseInt(id));
      const nivelAtualizado = await levelServices.getOne(parseInt(id));
      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteLevel(req, res) {
    const { id } = req.params;
    try {
      await levelServices.delete(parseInt(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NivelController;
