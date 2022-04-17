const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

// ROUTE 1: route for fetch all the notes related to the loggedIn user
router.get('/getAllNotes', fetchUser, async (req, res) => {
  const userId = req.user.id
  const notes = await Notes.find({user: userId}).select()
  res.json(notes)
})

// ROUTE 2: route for create Notes by a user
router.post('/createNotes', fetchUser,
 [
  body("title", "Enter A valid title").isLength({ min: 3 }),
  body("description", "Enter a Valid Description").isLength({ min: 5 }),
 ], async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try {
    const notes = await Notes.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    })
    console.log("note is created:", notes);
    res.json(notes)
  } catch (error) {
    res.status(500).json({ errors: "internal server error" });
  }
})

// ROUTE 3: route for update the notes
router.put('/updateNote/:id', fetchUser, async (req, res) => {
  const {title, description, tag} = req.body
  const newNote = {}
  if(title){newNote.title = title}
  if(description){newNote.description = description}
  if(tag){newNote.tag = tag}
  let note = await Notes.findById(req.params.id)
  if(!note){return res.status(404).send("Not found")}
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not permitted")
  }
  note = await Notes.findByIdAndUpdate(req.params.id, newNote)
  res.json(note)

})

module.exports = router