const express = require('express')
const router = express.Router()
const User = require('../models/User')

// End point for register a User

router.post('/', (req, res) => {
  console.log(req.body)
  const user = User(req.body)
  user.save()
  res.send(user)
})


module.exports = router