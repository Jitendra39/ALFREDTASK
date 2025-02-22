const mongoose = require('mongoose');


const history = new mongoose.Schema({
  question: {
    type: Array,
   
  },
  answer: {
    type: Array,
  },
  completeWithScore: {
    type: Number,
  }
});


const RapidRecall = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  history: [history],
});

const RapidRecallSchema = mongoose.model('RapidRecall', RapidRecall);




module.exports = RapidRecallSchema;