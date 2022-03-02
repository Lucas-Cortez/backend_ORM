// const database = require("../models");
const { AppError } = require("../errors");

const { PeopleServices } = require("../services");
const peopleServices = new PeopleServices();

class PeopleController {
  static async listAllActivePeople(req, res) {
    const activePeople = await peopleServices.getActive();
    return res.status(200).json(activePeople);
    // try {
    //   const activePeople = await peopleServices.getActive();
    //   return res.status(200).json(activePeople);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async listAllPeople(req, res) {
    const allPeople = await peopleServices.getAllRecords();
    return res.status(200).json(allPeople);
    // try {
    //   const allPeople = await peopleServices.getAllRecords();
    //   return res.status(200).json(allPeople);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async restorePerson(req, res) {
    const id = parseInt(req.params.id);

    const updateIsDone = await peopleServices.restore({ id: id });

    if (!!updateIsDone) {
      const personUpdated = await peopleServices.getOne({ id: id });
      return res.status(200).json(personUpdated);
    } else {
      throw Error("Restore did not done");
    }
    // try {
    //   const updateIsDone = await peopleServices.restore({ id: id });
    //   if (!!updateIsDone) {
    //     const personUpdated = await peopleServices.getOne({ id: id });
    //     return res.status(200).json(personUpdated);
    //   } else {
    //     throw Error("Restore did not done");
    //   }
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async listPerson(req, res) {
    const { id } = req.params;

    const person = await peopleServices.getOne({ id: parseInt(id) });
    return res.status(200).json(person);

    // try {
    //   const person = await peopleServices.getOne(parseInt(id));
    //   return res.status(200).json(person);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async createPerson(req, res) {
    const newPerson = req.body;

    const newPersonCreated = await peopleServices.create(newPerson);
    return res.status(200).json(newPersonCreated);

    // try {
    //   const newPersonCreated = await peopleServices.create(newPerson);
    //   return res.status(200).json(newPersonCreated);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async updatePerson(req, res) {
    const { id } = req.params;
    const newUpdate = req.body;

    const [updateIsDone] = await peopleServices.update(newUpdate, parseInt(id));

    if (!!updateIsDone) {
      const personUpdated = await peopleServices.getOne({ id: parseInt(id) });
      return res.status(200).json(personUpdated);
    } else {
      throw new AppError("Update did not done");
    }
    // try {
    //   const [updateIsDone] = await peopleServices.update(newUpdate, parseInt(id));

    //   if (!!updateIsDone) {
    //     const personUpdated = await peopleServices.getOne(parseInt(id));
    //     return res.status(200).json(personUpdated);
    //   } else {
    //     throw Error("Update did not done");
    //   }
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async deletePerson(req, res) {
    const id = parseInt(req.params.id);

    const deleteIsDone = await peopleServices.delete(parseInt(id));

    if (!!deleteIsDone) {
      return res.status(200).json({ message: "Delete done" });
    } else {
      throw new AppError("Delete did not done");
    }

    // try {
    //   const deleteIsDone = await peopleServices.delete(parseInt(id));

    //   if (!!deleteIsDone) {
    //     return res.status(200).json({ message: "Delete done" });
    //   } else {
    //     throw new AppError("Delete did not done");
    //   }
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async getRegistration(req, res) {
    const { studentId } = req.params;

    const person = await peopleServices.getOne({
      id: parseInt(studentId),
    });
    const matriculas = await person.getRegistrations();

    return res.status(200).json(matriculas);

    // try {
    //   const person = await peopleServices.getOne({
    //     id: parseInt(studentId),
    //   });
    //   const matriculas = await person.getRegistrations();

    //   return res.status(200).json(matriculas);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async cancelPerson(req, res) {
    const { studentId } = req.params;

    await peopleServices.cancelPersonRegistration(studentId);
    return res.status(200).json({ message: `matricula do estudante ${studentId} cancelada` });

    // try {
    //   await peopleServices.cancelPersonRegistration(studentId);
    //   return res.status(200).json({ message: `matricula do estudante ${studentId} cancelada` });
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }
}

module.exports = { PeopleController };
