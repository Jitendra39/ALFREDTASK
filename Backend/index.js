const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running. Forking ${numCPUs} workers...`);
  
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Listen for dying workers and fork a new one.
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Worker processes: run your Express server here.
  const express = require("express");
  const cors = require("cors");
  const mongoose = require("mongoose");
  const addToDb = require("./Controllers/FlipFrenzy");
  const Authenticated = require("./Middleware/Auth");
  const { default: LevelLogic } = require("./Controllers/LevelLogic");
  const path = require("path");
  require("dotenv").config();

  const updateScore = require("./Controllers/UpdateScore");
  const RapidRecall = require("./Controllers/RapidRecall");

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  mongoose.set("strictQuery", true);
  async function connectToMongoDB(url) {
    return mongoose.connect(url);
  }

  const mongoDBUrl = process.env.MONGO_URL;

  connectToMongoDB(mongoDBUrl)
    .then(() => {
      // MongoDB connected
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });

  // FlipFrenzy routes
  app.get("/flashcards", Authenticated, (req, res) => {
    LevelLogic(req, res, () => {
      res.send("Hello This is the Flashcards App!");
    });
  });

  app.post("/flashcards", (req, res) => {
    const { id } = req.body;
    addToDb(id);
    res.send("Create a new flashcard");
  });

  app.put("/flashcards/:id", (req, res) => {
    const { level, matchCount, id } = req.body;
    updateScore(id, level, matchCount);
    res.send("Update a flashcard");
  });

  app.delete("/flashcards/:id", (req, res) => {
    res.send("Delete a flashcard");
  });

  // RapidRecall routes
  app.post("/api/rapidrecall", (req, res) => {
    RapidRecall.RapidRecall(req, res);
  });

  app.get("/api/rapidrecall", (req, res) => {
    RapidRecall.updateScoreRapidRecall(req, res);
  });

  app.listen(port, () => {
    console.log(`Worker ${process.pid}: Server is running on http://localhost:${port}`);
  });
}
