const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:  {
    type: 'string',
    required: true,
  },
  email:  {
    type: 'string',
    required: true,
    unique: true,
  },
  password:  {
    type: 'string',
    required: true,
  },
  time:  {
    type: 'date',
    default: new Date,
  },
});

const user = mongoose.model('user', UserSchema)
user.createIndexes()
module.exports = user;