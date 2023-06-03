const noteModel = require("../models/noteModel");

//Getting All Notes Of the User
const getNotes = async (req, res) => {
  const notes = await noteModel.find({ authorId: req.user.userId });
  res.send(notes);
};

//Saving Note Of the User
const saveNote = (req, res) => {
  const { note } = req.body;

  noteModel
    .create({ note, authorId: req.user.userId })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

//Updating Note Of the User
const updateNote = (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  noteModel
    .findByIdAndUpdate(id, { note })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

//Deleting Note Of the User
const deleteNote = (req, res) => {
  const { id } = req.params;

  noteModel
    .findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

module.exports = {
  getNotes,
  saveNote,
  updateNote,
  deleteNote,
};
