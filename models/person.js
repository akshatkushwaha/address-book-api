const mongoose = require("mongoose");

const person = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 character"],
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    maxlength: [20, "name cannot be more than 20 character"],
  },
  email: {
    type: String,
    required: false,
    trim: true,
    maxlength: [30, "email cannot be more than 30 character"],
  },
  tel: {
    type: String,
    maxlength: [14, "Invalid contact number"],
  },
});

module.exports = mongoose.model("Person", person);
