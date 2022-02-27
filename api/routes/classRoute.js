const { Router } = require("express");
const { ClassController } = require("../controllers");

const router = Router();

router
  .get("/", ClassController.listAllClasses)
  .get("/:id", ClassController.listClass)

  .post("/", ClassController.createClass)

  .put("/:id", ClassController.updateClass)

  .delete("/:id", ClassController.deleteClass);

module.exports = router;
