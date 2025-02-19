const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const addToDb = require("./Controllers/FlashCard");
const Authenticated = require("./Middleware/Auth");
const { default: LevelLogic } = require("./Controllers/LevelLogic");
const path = require("path");
require("dotenv").config();

const updateScore = require("./Controllers/updateScore");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

const mongoDBUrl = process.env.MONGO_URL;

connectToMongoDB(mongoDBUrl)
  .then(() => {
    //console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Flashcards routes
app.get("/flashcards", Authenticated, (req, res) => {
  LevelLogic(req, res, () => {
    res.send("Hello This is the Flashcards App!");
  });
});

app.post("/flashcards", (req, res) => {
  const { id } = req.body;
  //console.log("called", id);
  addToDb(id);
  res.send("Create a new flashcard");
});

app.put("/flashcards/:id", (req, res) => {
  //console.log("called", req.body);
  const { level, matchCount, id } = req.body;
  updateScore(id, level, matchCount);
  res.send("Update a flashcard");
});

app.delete("/flashcards/:id", (req, res) => {
  res.send("Delete a flashcard");
});

/**
 * Serve images from MongoDB GridFS.
 * This route expects a query parameter "filename" with the full file path (if applicable).
 */
// app.get('/Images', async (req, res) => {
//   const { add } = req.query;
// const filename = path.basename(add);

//   if (!filename) {
//     return res.status(400).send("Filename query parameter is required");
//   }

//   //console.log("Fetching image from GridFS:", filename);

//   try {
//     const db = mongoose.connection.db;
//     const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'publicImages' });

//     // Case-insensitive search for filename
//     const cursor = bucket.find({ filename: { $regex: `^${filename}$`, $options: "i" } });
//     const fileInfo = await cursor.toArray();

//     if (!fileInfo || fileInfo.length === 0) {
//       console.error(`File ${filename} not found in GridFS`);
//       return res.status(404).send("File not found");
//     }

//     const storedFileName = fileInfo[0].filename;
//     const downloadStream = bucket.openDownloadStreamByName(storedFileName);

//     downloadStream.on('error', (err) => {
//       console.error("Error downloading file:", err);
//       res.status(404).send("File not found");
//     });

//     res.set('Content-Type', 'image/jpeg');
//     downloadStream.pipe(res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error retrieving file");
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
