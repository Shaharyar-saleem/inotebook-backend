const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 3000

connectToMongo()


// Routes for application
app.use('/login', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})