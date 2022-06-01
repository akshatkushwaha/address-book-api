const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 character"],
  },
  password: {
    type: String,
    required: [true, "Must provide Password"],
    trim: true,
  },
});

module.exports = mongoose.model("User", user);
