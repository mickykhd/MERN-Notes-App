const { Router } = require("express");
const router = Router();
//Notes end points for authentication
const {
  getNotes,
  saveNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.get("/get", getNotes);
router.post("/save", saveNote);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

module.exports = router;
