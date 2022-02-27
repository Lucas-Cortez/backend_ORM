const { Router } = require("express");
const { RegistryController, PeopleController } = require("../controllers");

const router = Router();

// PESSOAS
router.get("/", PeopleController.listAllPeople);
router.get("/ativas", PeopleController.listAllActivePeople);
router.get("/:id", PeopleController.listPerson);

router.post("/", PeopleController.createPerson);
router.post("/:id/restore", PeopleController.restorePerson);
router.post("/:studentId/cancela", PeopleController.cancelPerson);

router.put("/:id", PeopleController.updatePerson);

router.delete("/:id", PeopleController.deletePerson);

// MATRICULAS
router.get("/matricula/lotada", RegistryController.getFullClass);
router.get("/matricula/:classId/confirmadas", RegistryController.getRegistrationPerClass);
router.get("/:studentId/matricula", PeopleController.getRegistration);
router.get("/:studentId/matricula/:registrationId", RegistryController.listRegistration);

router.post("/:studentId/matricula", RegistryController.createRegistration);

router.put("/:studentId/matricula/:registrationId", RegistryController.updateRegistration);

router.delete("/:studentId/matricula/:registrationId", RegistryController.deleteRegistration);

module.exports = router;
