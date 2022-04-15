const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

router.get('/', (req, res) => {
  res.json("hi there")
})

router.post('/createNotes', fetchUser,
 [
  body("title", "Title is required"),
  body("description", "Description is required"),
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