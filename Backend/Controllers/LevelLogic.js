import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LevelLogic = (req, res) => {
  try {

    res.json({ level: req.userData.level });
  } catch (error) {
    console.error("Error in LevelLogic:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default LevelLogic;
