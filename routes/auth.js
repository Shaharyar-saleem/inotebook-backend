const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// End point for register a User : login is not required for this route
router.post(
  "/",
  [
    body("name", "Please Enter a valid name").isLength({ min: 3 }),
    body("email", "Please Enter a valid email").isEmail(),
    body("password", "Please Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check if the user is already register with the same email address
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(500)
        .json({ error: "email address already registered in the system" });
    }
    let securePassword = bcrypt.hashSync(req.body.password, saltRounds)
    console.log("Secure password:", securePassword)
    // Creating a user in the User table/object
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });
    res.json(req.body);
    } catch (error) {
       console.log("error", error.message);
       res.status(500).json({ error: "something went wrong"})
    }
  }
);

module.exports = router;
