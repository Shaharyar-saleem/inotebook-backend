import mongoose from 'mongoose';
const { Schema } = mongoose;

const notesSchema = new Schema({
  title:  {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  tag:  {
    type: 'string',
    default: 'Genral',
  },
  time:  {
    type: 'time',
    default: new Date,
  },
});

module.exports = mongoose.model('notes', notesSchema);