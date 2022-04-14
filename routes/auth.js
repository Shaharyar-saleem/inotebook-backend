const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const JWT_SECRET_KEY = "youaresecurehere";

// End point for register a User : login is not required for this route
router.post(
  "/regiter",
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
    // Creating a user in the User table/object
     user = User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });
    const data = {
      user: {
        "id": req.body.id, 
      }
    }
    const token = jwt.sign(data, JWT_SECRET_KEY);
    res.json(token);
    } catch (error) {
       res.status(500).json({ error: "internal server error"})
    }
  }
);

// Authenticate a user with email and password
router.post("/login", [
  body("email", "Please Enter a valid email").isEmail(),
  body("password", "Please Enter a valid password").isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {email, password} = req.body
      const user = await User.findOne({ email: email})
      if(!user){
        return res.status(400).json({error: "Please enter the correct credentials"}) 
      }
      const userPassword = await bcrypt.compare(password, user.password)
      console.log("DB password:", userPassword)
      if(!userPassword){
        return res.status(400).json({error: "Please enter the correct credentials"})
      }
      const data = {
        user: {
          "id": User.id,
        }
      }
      const token = jwt.sign(data, JWT_SECRET_KEY)
      res.json(token)
    } catch (error) {
      res.status(500).json({error: "Internal server error"})
    }
})
module.exports = router;
