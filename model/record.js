const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  course: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

//creation of model
const Record = mongoose.model("Record", recordSchema);

// export the model
module.exports = Record;
