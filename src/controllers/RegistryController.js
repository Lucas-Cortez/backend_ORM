const { RegistrationServices } = require("../services");
const { literal } = require("sequelize");
const { AppError } = require("../errors");

const registrationServices = new RegistrationServices();

class RegistryController {
  static async listRegistration(req, res) {
    const { studentId, registrationId } = req.params;

    const matricula = await registrationServices.getOne({
      id: registrationId,
      estudante_id: studentId,
    });

    return res.status(200).json(matricula);

    // try {
    //   const matricula = await registrationServices.getOne({
    //     id: registrationId,
    //     estudante_id: studentId,
    //   });

    //   return res.status(200).json(matricula);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async createRegistration(req, res) {
    const { studentId } = req.params;
    const newRegistration = { ...req.body, estudante_id: parseInt(studentId) };

    try {
      const registration = await registrationServices.create(newRegistration);
      return res.status(200).json(registration);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateRegistration(req, res) {
    const { studentId, registrationId } = req.params;
    const newUpdate = req.body;

    const [updateIsDone] = await registrationServices.updateMany(newUpdate, {
      id: parseInt(registrationId),
      estudante_id: parseInt(studentId),
    });

    if (!!updateIsDone) {
      const updated = await registrationServices.getOne({
        id: parseInt(registrationId),
      });
      return res.status(200).json(updated);
    } else {
      throw new AppError("Update did not done");
    }

    // try {
    //   const [updateIsDone] = await registrationServices.updateMany(newUpdate, {
    //     id: parseInt(registrationId),
    //     estudante_id: parseInt(studentId),
    //   });

    //   if (!!updateIsDone) {
    //     const updated = await registrationServices.getOne({
    //       id: parseInt(registrationId),
    //     });
    //     return res.status(200).json(updated);
    //   } else {
    //     throw new AppError("Update did not done");
    //   }
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async deleteRegistration(req, res) {
    const { studentId, registrationId } = req.params;

    const deleteIsDone = await registrationServices.delete({
      id: parseInt(registrationId),
      estudante_id: parseInt(studentId),
    });

    if (!!deleteIsDone) {
      return res.status(200).json({ message: "Delete done" });
    } else {
      throw new AppError("Delete did not done");
    }

    // try {
    //   const deleteIsDone = await registrationServices.delete({
    //     id: parseInt(registrationId),
    //     estudante_id: parseInt(studentId),
    //   });

    //   if (!!deleteIsDone) {
    //     return res.status(200).json({ message: "Delete done" });
    //   } else {
    //     throw new AppError("Delete did not done");
    //   }
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async getRegistrationPerClass(req, res) {
    const { classId } = req.params;

    const registration = await registrationServices.findAndCount(
      {
        turma_id: parseInt(classId),
        status: "confirmado",
      },
      {
        limit: 1,
        order: [["estudante_id", "ASC"]],
      }
    );

    return res.status(200).json(registration);

    // try {
    //   const registration = await registrationServices.findAndCount(
    //     {
    //       turma_id: parseInt(classId),
    //       status: "confirmado",
    //     },
    //     {
    //       limit: 1,
    //       order: [["estudante_id", "ASC"]],
    //     }
    //   );

    //   return res.status(200).json(registration);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }

  static async getFullClass(req, res) {
    const full = 1;

    const fullClass = await registrationServices.findAndCount(
      {
        status: "confirmado",
      },
      {
        attributes: ["turma_id"],
        group: ["turma_id"],
        having: literal(`count(turma_id) >= ${full}`),
      }
    );

    return res.status(200).json(fullClass.count);

    // try {
    //   const fullClass = await registrationServices.findAndCount(
    //     {
    //       status: "confirmado",
    //     },
    //     {
    //       attributes: ["turma_id"],
    //       group: ["turma_id"],
    //       having: literal(`count(turma_id) >= ${full}`),
    //     }
    //   );

    //   return res.status(200).json(fullClass.count);
    // } catch (error) {
    //   return res.status(500).json(error.message);
    // }
  }
}

module.exports = { RegistryController };
