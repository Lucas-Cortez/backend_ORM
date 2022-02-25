const { Router } = require("express");
const NivelController = require("../controllers/NivelController");

const router = Router();
router
  .get("/", NivelController.listAllLevels)
  .get("/:id", NivelController.listLevel)

  .post("/", NivelController.createLevel)

  .put("/:id", NivelController.updateLevel)

  .delete("/:id", NivelController.deleteLevel);
module.exports = router;
