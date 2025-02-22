const mongoose = require('mongoose');

const FlipFrenzy = new mongoose.Schema({
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

const FlipFrenzyModule = mongoose.model("FlipFrenzy", FlipFrenzy);

module.exports = FlipFrenzyModule;