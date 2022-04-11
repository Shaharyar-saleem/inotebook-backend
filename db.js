const mongoose = require('mongoose')

const connectionURI = "mongodb://localhost:27017/inotebook"

const connectDb = () => {
    mongoose.connect(connectionURI, ()=>{
        console.log("Mongoose connected successfully!")
    })
}

module.exports = connectDb