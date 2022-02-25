const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController");

const router = Router();

router
  .get("/", TurmaController.listAllClasses)
  .get("/:id", TurmaController.listClass)

  .post("/", TurmaController.createClass)

  .put("/:id", TurmaController.updateClass)

  .delete("/:id", TurmaController.deleteClass);

module.exports = router;
