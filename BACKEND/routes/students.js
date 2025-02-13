/*const express = require("express");
const router = express.Router();
let Student = require("../models/student");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add student" });
    });
});

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch students" });
    });
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch students" });
    });
});

router.route("/update/:id").put(async (req, res) => {
  const id = req.params.id;
  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(id, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updtaes" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  await Student.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "Delete success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Delete unseccess" });
    });
});

module.exports = router;
*/
