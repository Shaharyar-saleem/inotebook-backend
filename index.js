const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
connectToMongo()


// Routes for application
app.use('/api/auth', require('./routes/auth'))
// app.use('/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})