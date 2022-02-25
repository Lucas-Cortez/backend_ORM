const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/", PessoaController.listAllPeople);
router.get("/ativas", PessoaController.listAllActivePeople);
router.get("/matricula/:classId/confirmadas", PessoaController.getRegistrationPerClass);
router.get("/matricula/lotada", PessoaController.getFullClass);
router.get("/:studentId/matricula", PessoaController.getRegistration);
router.get("/:id", PessoaController.listPerson);
router.get("/:studentId/matricula/:registrationId", PessoaController.listRegistration);

router.post("/", PessoaController.createPerson);
router.post("/:studentId/matricula", PessoaController.createRegistration);
router.post("/:id/restore", PessoaController.restorePerson);
router.post("/:studentId/cancela", PessoaController.cancelPerson);

router.put("/:id", PessoaController.updatePerson);
router.put("/:studentId/matricula/:registrationId", PessoaController.updateRegistration);

router.delete("/:id", PessoaController.deletePerson);
router.delete("/:studentId/matricula/:registrationId", PessoaController.deleteRegistration);

module.exports = router;
