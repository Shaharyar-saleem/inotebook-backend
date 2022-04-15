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
      tags: req.body.tags,
    })
    console.log("note is created:", notes);
    res.json(notes)
  } catch (error) {
    res.status(500).json({ errors: "internal server error" });
  }
})


module.exports = router