const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");

const router = Router();

router.get("/pessoas", PessoaController.listAllActivePeople);
router.get("/pessoas/all", PessoaController.listAllPeople);
router.get("/pessoas/matricula/:classId/confirmadas", PessoaController.getRegistrationPerClass);
router.get("/pessoas/matricula/lotada", PessoaController.getFullClass);
router.get("/pessoas/:id", PessoaController.listPerson);
router.post("/pessoas", PessoaController.createPerson);
router.post("/pessoas/:studentId/cancela", PessoaController.cancelPerson);
router.put("/pessoas/:id", PessoaController.updatePerson);
router.delete("/pessoas/:id", PessoaController.deletePerson);

router.get("/pessoas/:studentId/matricula/:registrationId", PessoaController.listRegistration);
router.post("/pessoas/:studentId/matricula", PessoaController.createRegistration);
router.put("/pessoas/:studentId/matricula/:registrationId", PessoaController.updateRegistration);
router.delete("/pessoas/:studentId/matricula/:registrationId", PessoaController.deleteRegistration);

router.post("/pessoas/:id/restore", PessoaController.restorePerson);

router.get("/pessoas/:studentId/matricula", PessoaController.getRegistration);

module.exports = router;
