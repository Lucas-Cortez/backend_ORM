const { Router } = require("express");
const { LevelController } = require("../controllers");

const router = Router();

router
  .get("/", LevelController.listAllLevels)
  .get("/:id", LevelController.listLevel)

  .post("/", LevelController.createLevel)

  .put("/:id", LevelController.updateLevel)

  .delete("/:id", LevelController.deleteLevel);

module.exports = router;
