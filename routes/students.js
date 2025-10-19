const express = require("express");
const path = require("path");
const router = express.Router();
const nameDir = require("../util/path");
const mongoose = require("mongoose");
const Record = require("../model/record"); // require the model

router.post("/students", (req, res) => {
  //   res.sendFile(path.join(nameDir, "views", "userList.html"));
  //   res.send("Add Student");
  res.render("addStu.ejs");
});

// add new student into db
router.post("/addstudent", async (req, res) => {
  let { Name, age, email, course } = req.body;
  let newStudent = {
    Name: Name,
    age: age,
    email: email,
    course: course,
    created_at: Date.now(),
  };
  const existEmail = await Record.findOne({ email: newStudent.email });

  if (existEmail) {
    res.render("existEmail.ejs");
    // res.send("Email already exist!!!!");
  } else {
    Record.insertOne(newStudent)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/students");
  }
});

// View the Single studentInfo
router.get("/:id/students", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let studentData = await Record.findById(id);
  res.render("viewStu.ejs", { studentData });
  // console.log(studentData);
  // res.send(studentData);
});

// edit student record
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let studentData = await Record.findById(id);
  res.render("editStu.ejs", { studentData });
  // console.log(studentData);
  // res.send(studentData);
});

// update the message
router.put("/:id/updated", async (req, res) => {
  let { id } = req.params;
  let { Name, age, email, course } = req.body;
  let updateRecord = await Record.findByIdAndUpdate(
    id,
    { Name: Name, age: age, email: email, course: course },
    { new: true, runValidators: true }
  );
  res.redirect("/students");
  // res.send("Update here");
});

// Destroy student record
router.delete("/:id/students", async (req, res) => {
  let { id } = req.params;
  let studentData = await Record.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  });
  res.redirect("/students");
});

module.exports = router;
