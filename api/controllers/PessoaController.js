// const database = require("../models");
const { literal } = require("sequelize");

const { PeopleServices } = require("../services");
const peopleServices = new PeopleServices();

class PessoaController {
  static async listAllActivePeople(req, res) {
    try {
      const activePeople = await peopleServices.getActive();
      return res.status(200).json(activePeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listAllPeople(req, res) {
    try {
      const allPeople = await peopleServices.getAllRecords();
      return res.status(200).json(allPeople);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restorePerson(req, res) {
    const id = parseInt(req.params.id);
    try {
      const updateIsDone = await database.Pessoas.restore({ where: { id: id } });
      if (!!updateIsDone) {
        const personUpdated = await database.Pessoas.findOne({ where: { id: id } });
        return res.status(200).json(personUpdated);
      } else {
        throw Error("Update did not done");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listPerson(req, res) {
    const { id } = req.params;

    try {
      const person = await peopleServices.getOne(parseInt(id));
      return res.status(200).json(person);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createPerson(req, res) {
    const newPerson = req.body;

    try {
      const newPersonCreated = await peopleServices.create(newPerson);
      return res.status(200).json(newPersonCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updatePerson(req, res) {
    const { id } = req.params;
    const newUpdate = req.body;

    try {
      const [updateIsDone] = await peopleServices.update(newUpdate, parseInt(id));

      if (!!updateIsDone) {
        const personUpdated = await peopleServices.getOne(parseInt(id));
        return res.status(200).json(personUpdated);
      } else {
        throw Error("Update did not done");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletePerson(req, res) {
    const id = parseInt(req.params.id);

    try {
      const deleteIsDone = await peopleServices.delete(parseInt(id));

      if (!!deleteIsDone) {
        return res.status(200).json({ message: "Delete done" });
      } else {
        throw Error("Delete did not done");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listRegistration(req, res) {
    const { studentId, registrationId } = req.params;

    try {
      const matricula = await database.Matriculas.findOne({
        where: {
          id: parseInt(registrationId),
          estudante_id: parseInt(studentId),
        },
      });

      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createRegistration(req, res) {
    const { studentId } = req.params;
    const newRegistration = { ...req.body, estudante_id: parseInt(studentId) };

    try {
      const Registration = await database.Matriculas.create(newRegistration);
      return res.status(200).json(Registration);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateRegistration(req, res) {
    const { studentId, registrationId } = req.params;
    const newUpdate = req.body;

    try {
      const [updateIsDone] = await database.Matriculas.update(newUpdate, {
        where: {
          id: parseInt(registrationId),
          estudante_id: parseInt(studentId),
        },
      });

      if (!!updateIsDone) {
        const updated = await database.Matriculas.findOne({
          where: { id: parseInt(registrationId) },
        });
        return res.status(200).json(updated);
      } else {
        throw Error("Update did not done");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteRegistration(req, res) {
    const { studentId, registrationId } = req.params;

    try {
      const deleteIsDone = await database.Matriculas.destroy({
        where: {
          id: parseInt(registrationId),
          estudante_id: parseInt(studentId),
        },
      });

      if (!!deleteIsDone) {
        return res.status(200).json({ message: "Delete done" });
      } else {
        throw Error("Delete did not done");
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getRegistration(req, res) {
    const { studentId } = req.params;

    try {
      const person = await database.Pessoas.findOne({
        where: {
          id: parseInt(studentId),
        },
      });
      const matriculas = await person.getRegistrations();

      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getRegistrationPerClass(req, res) {
    const { classId } = req.params;

    try {
      const registration = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: parseInt(classId),
          status: "confirmado",
        },
        limit: 1,
        order: [["estudante_id", "ASC"]],
      });

      return res.status(200).json(registration);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getFullClass(req, res) {
    const full = 1;

    try {
      const fullClass = await database.Matriculas.findAndCountAll({
        attributes: ["turma_id"],
        where: {
          status: "confirmado",
        },
        group: ["turma_id"],
        having: literal(`count(turma_id) >= ${full}`),
      });

      return res.status(200).json(fullClass.count);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cancelPerson(req, res) {
    const { studentId } = req.params;

    try {
      await peopleServices.cancelPersonRegistration(studentId);
      return res.status(200).json({ message: `matricula do estudante ${studentId} cancelada` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
