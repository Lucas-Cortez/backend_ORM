"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: "docente_id",
      });

      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: { status: "confirmado" },
        as: "registrations",
      });
    }
  }

  Pessoas.init(
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          validator: (data) => {
            if (data.length < 3) throw new Error("Nome deve ter mais de 3 caracteres");
          },
        },
      },
      ativo: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Dado do tipo e-mail inválido",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Pessoas",
      paranoid: true,
      defaultScope: {
        where: {
          ativo: true,
        },
      },
      scopes: {
        all: { where: {} },
      },
    }
  );
  return Pessoas;
};
