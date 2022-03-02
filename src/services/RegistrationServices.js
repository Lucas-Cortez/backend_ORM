const Services = require("./Services");
// const database = require("../models");

class RegistrationServices extends Services {
  constructor() {
    super("Matriculas");
  }
}
module.exports = { RegistrationServices };
