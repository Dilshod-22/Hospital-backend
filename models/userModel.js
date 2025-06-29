const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    required:true
  },
  email: {
    type: String,
    match: [/^[a-zA-Z0-9]+@gmail\.com$/, "Please enter a valid Gmail address"],
    unique: true,
    index: true,
    required:true
  },
  password: {
    type: String,
    minlength: 8,
    required:true
  },
  preferLanguage: {
    type: String,
    enum: ["UZ", "RU", "ENG"],
    default: "UZ",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

const user = mongoose.model("userModel", Schema);
module.exports = user;
