const mongoose = require("mongoose");

//Notes model for mongoDB
const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

const noteModel = mongoose.model("Note", NoteSchema);
module.exports = noteModel;
