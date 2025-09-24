module.exports = app => {
    var router = require("express").Router();
    var courseController = require("../controllers/coursecontroller.js");
    router.get("/courses", courseController.findAll);
    router.get("/course/:id", courseController.get);
    router.put("/course/:id", courseController.update);
    router.post("/course", courseController.create);
    router.delete("/course/:id", courseController.delete);

    app.use('/coursesapi', router);
}
