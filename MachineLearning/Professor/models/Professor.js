const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  professor_name: { type: String, required: true },
  rating: { type: Number },
  department: { type: String },
  comments: [
    {
      text: { type: String },
      pos: { type: Number },
      neu: { type: Number },
      neg: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Professor", professorSchema);
