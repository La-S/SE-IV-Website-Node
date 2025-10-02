const db = require("../models");
const Course = db.Course;
const Op = db.Sequelize.Op;
const missingAttr = "Missing attribute: "

// Create and Save a new Course
exports.create = async (req, res) => {
  let newCourse = req.body
  // Validate request
  let attributeError = checkAttributes(newCourse);
  if (attributeError) {
    res.status(400).send({
      message: attributeError
    });
    return;
  }
  newCourse.number = String(newCourse.number).substring(0,12);
  if (await findCourseByNumber(newCourse.number)) {
    res.status(400).send({ message: `Course with number: ${newCourse.number} already exists.` });
    return;
  }

  // Create Course from request
  const course = {
    department: newCourse.department,
    number: newCourse.number,
    name: newCourse.name,
    level: newCourse.level,
    hours: newCourse.hours,
    description: newCourse.description ? newCourse.description : ""
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
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Course.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses"
      });
    });
};

// Find a single Course based on id
exports.get = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No course found for id: ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Course for id: ${id}`
      });
    });
};

// Update a Course by specified id
exports.update = async (req, res) => {
  const id = req.params.id;
  let courseById = null;
  let courseByNumber = null;
  if (!(courseById = await findCourseById(id))) {
    res.status(404).send({ message: `No course for id: ${id} found.` });
    return;
  }
  if (req.body.number) {
    if ((courseByNumber = await findCourseByNumber(req.body.number))
      && (JSON.stringify(courseById) !== JSON.stringify(courseByNumber))) {
      res.status(400).send({ message: `Course for number ${req.body.number} exists. Please use a different course number` })
      return;
    }
  }

  Course.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot update Course with id: ${id}. Check the request body.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Course for id: ${id}`
      });
    });
};

// Delete a Course with the specified id

exports.delete = async (req, res) => {
  const id = req.params.id;
  if (!(await findCourseById(id))) {
    res.status(404).send({ message: `No course for id: ${id} found.` });
    return;
  }

  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot delete Course with id=${id}. There may be some deletion restriction.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Course with id=${id}`
      });
    });
};

exports.uploadArray = async (req, res) => {
  let data = req.body;
  console.log(data);
  const errors = [];

  if (!data[0]){
    res.status(400).send({
      message: "This endpoint only accepts arrays as input"
    });
    return;
  }

  for (const course of data) {
    try {
      await createForArray(course);
    } catch (error) {
      errors.push(JSON.stringify(error));
    }
  }


  if (errors.length == data.length) {
    let responseString = "All course uploads failed.";
    res.status(400).send({
      message: responseString
    });
  }
  else if (errors.length != 0) {
    let responseString = "Some courses failed. Likely duplicates already in database.";
    res.status(200).send({
      message: responseString
    });
  }
  else
    res.status(200).send({
      message: "All courses added successfully"
    });
}

async function createForArray(req) {
  let newCourse = req;
  let attributeError = checkAttributes(newCourse);
  if (attributeError) {
    throw Error({ message: attributeError });
  }
  newCourse.number = String(newCourse.number).substring(0,12);
  if (await findCourseByNumber(newCourse.number)) {
    throw Error({ message: `Course with number: ${newCourse.number} already exists.` });
  }

  // Create Course from request
  const course = {
    department: newCourse.department,
    number: newCourse.number,
    name: newCourse.name,
    level: newCourse.level,
    hours: newCourse.hours,
    description: newCourse.description ? newCourse.description : ""
  };

  // Save Course in db
  Course.create(course);
};

// Get all courses from the database
exports.findAll = (req, res) => {
  //const title = req.query.title;
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Course.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses"
      });
    });
};

async function findCourseByNumber(queryNum) {
  course = await Course.findOne({ where: { number: queryNum } });// ? true : false;
  return course;

}

async function findCourseById(id) {
  return course = await Course.findByPk(id)// ? true : false;
}

function checkAttributes(req) {
  if (!req.department)
    return missingAttr + "department";
  if (!req.number)
    return missingAttr + "number";
  if (!req.name)
    return missingAttr + "name";
  if (!req.level)
    return missingAttr + "level";
  if (!req.hours)
    return missingAttr + "hours";
  return null;
}