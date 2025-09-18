import courseController from "../coursecontroller.js";

var express = require('express');
var router = express.Router();

router.get("/courses", courseController.findAll);
router.get("/course/:id", courseController.get);
router.put("/course/:id", courseController.update);
router.post("/course", courseController.create);
router.delete("/course/:id", courseController.delete);

module.exports = router;
