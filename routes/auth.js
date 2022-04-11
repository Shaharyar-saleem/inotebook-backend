const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// End point for register a User

router.post('/', [
    body('name', 'Please Enter a valid name').isLength({min: 3}),
    body("email", 'Please Enter a valid email').isEmail(),
    body("password", 'Please Enter a valid password').isLength({min: 5}),
], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user))
    .catch(err => console.log("Error Here:", err))
    res.json({error: "please enter a unique email"})

})


module.exports = router