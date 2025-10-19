const express = require("express");
const app = express();
const PORT = 3000;

const mongoose = require("mongoose");
// import Record from "./model/record";
const Record = require("./model/record");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const studentRouter = require("./routes/students"); //require routes
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// use of filtering
app.use("/api", studentRouter);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/studentrecord");
}

main()
  .then(() => {
    console.log("Connection setup successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// route to see -> all students records
app.get("/students", async (req, res) => {
  let studentRecord = await Record.find();
  // res.send("All students list here....");
  res.render("students.ejs", { studentRecord });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port number${PORT}`);
});
