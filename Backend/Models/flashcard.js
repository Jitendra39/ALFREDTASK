const mongoose = require('mongoose');

const flashcard = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  level:{
    type: String,
    required: true,
  },
  history:{
    type: Array,
  },
  visitHistory: [{timestamp: {type: Number}}],
},
{timestamps: true});

const flashCardModule = mongoose.model("flashcard", flashcard);

module.exports = flashCardModule;