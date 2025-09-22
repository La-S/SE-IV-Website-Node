
//NOT IMPLEMENTED. TODO


const db = require("../models");
const Course = db.Course;
const Op = db.Sequelize.Op;
const missingAttr = "Missing attribute: "

// Create and Save a new Course
exports.create = (req, res) => {
    console.log(db);
    console.log(db.Course);
    // Validate request
    let error = checkAttributes(req);
     if (error) {
       res.status(400).send({
         message: error
       });
       return;
     }
  
    // Create Course from request
    const course = {
      department: req.body.department,
      number: req.body.number,
      name: req.body.name,
      level: req.body. level,
      hours: req.body.hours,
      description: req.body.description ? req.body.description : ""
    };
  
    // Save Course in db
    Course.create(course)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Course."
        });
      });
  };

// Get all courses from the database
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    // Tutorial.findAll({ where: condition })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving tutorials."
    //     });
    //   });
    res.send("NOT IMPLEMENTED: GET ALL COURSES")
  };

// Find a single Course based on id
exports.get = (req, res) => {
    // const id = req.params.id;
  
    // Tutorial.findByPk(id)
    //   .then(data => {
    //     if (data) {
    //       res.send(data);
    //     } else {
    //       res.status(404).send({
    //         message: `Cannot find Tutorial with id=${id}.`
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Error retrieving Tutorial with id=" + id
    //     });
    //   });
    res.send("NOT IMPLEMENTED: GET COURSE")
  };

// Update a Course by specified id
exports.update = (req, res) => {
    // const id = req.params.id;
  
    // Tutorial.update(req.body, {
    //   where: { id: id }
    // })
    //   .then(num => {
    //     if (num == 1) {
    //       res.send({
    //         message: "Tutorial was updated successfully."
    //       });
    //     } else {
    //       res.send({
    //         message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Error updating Tutorial with id=" + id
    //     });
    //   });
    res.send("NOT IMPLEMENTED: UPDATE COURSE")
  };

// Delete a Course with the specified id

exports.delete = (req, res) => {
    // const id = req.params.id;
  
    // Tutorial.destroy({
    //   where: { id: id }
    // })
    //   .then(num => {
    //     if (num == 1) {
    //       res.send({
    //         message: "Tutorial was deleted successfully!"
    //       });
    //     } else {
    //       res.send({
    //         message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Could not delete Tutorial with id=" + id
    //     });
    //   });
    res.send("NOT IMPLEMENTED: DELETE COURSE")
  };

  function checkAttributes(req){
    if (!req.body.department)
      return missingAttr + "department";
    if (!req.body.number)
      return missingAttr + "number";
    if (!req.body.name)
      return missingAttr + "name";
        if (!req.body.level)
      return missingAttr + "level";
        if (!req.body.hours)
      return missingAttr + "hours";
    return null;
  }