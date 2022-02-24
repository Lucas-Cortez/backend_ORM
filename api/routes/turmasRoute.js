const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();
router
  .get("/turmas", TurmaController.listAllClasses)
  .get("/turmas/:id", TurmaController.listClass)
  .post("/turmas", TurmaController.createClass)
  .put("/turmas/:id", TurmaController.updateClass)
  .delete("/turmas/:id", TurmaController.deleteClass);
module.exports = router;
