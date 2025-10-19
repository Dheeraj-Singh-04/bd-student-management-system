const express = require("express");

const app = express();

const mongoose = require("mongoose");

const Record = require("./model/record"); // require the model

async function main() {
  await mongoose.connect("mongodb://localhost:27017/studentrecord");
}

main()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

let recordBox = [
  {
    Name: "Sawan Singh",
    age: 20,
    email: "sawansingh@gmail.com",
    course: "BCA",
    created_at: Date.now(),
  },
  {
    Name: "Jasnoor Pal Singh",
    age: 19,
    email: "jasnoorpalsingh@gmail.com",
    course: "BCA",
    created_at: Date.now(),
  },
  {
    Name: "Diljan Singh",
    age: 18,
    email: "diljansingh@gmail.com",
    course: "B-Tech",
    created_at: Date.now(),
  },
  {
    Name: "Ritik Singh",
    age: 21,
    email: "sawansingh@gmail.com",
    course: "B-Voc",
    created_at: Date.now(),
  },
];

Record.insertMany(recordBox);
