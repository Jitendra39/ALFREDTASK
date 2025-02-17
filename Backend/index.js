const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const addToDb = require('./Controllers/FlashCard');
const Authenticated = require('./Middleware/Auth');
const { default: LevelLogic } = require('./Controllers/LevelLogic');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, "public")));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

connectToMongoDB("mongodb://localhost:27017/flashcard").then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});




app.get('/flashcards', Authenticated, (req, res) => {
  console.log("called", req.userData);
  LevelLogic(req, res, () => {
    res.send('Hello This is the Flashcards App!');
  });
});

app.post('/flashcards', (req, res) => {
  const { id } = req.body;
  console.log("called",id);
  addToDb(id)
  res.send('Create a new flashcard');
});

app.put('/flashcards/:id', (req, res) => {
  res.send('Update a flashcard');
});

app.delete('/flashcards/:id', (req, res) => {
  res.send('Delete a flashcard');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});