const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
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
    type: 'date',
    default: new Date,
  },
});

module.exports = mongoose.model('notes', NotesSchema);