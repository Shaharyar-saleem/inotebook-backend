import mongoose from 'mongoose';
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
    type: 'time',
    default: new Date,
  },
});

module.exports = mongoose.model('user', UserSchema);