import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LevelLogic = (req, res) => {
  try {
    const { level } = req.userData;

    const animalDir = path.join(__dirname, "../public/animal");

    const images = fs
      .readdirSync(animalDir)
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

    console.log("Images:", images);

    let imageCount;
    switch (level) {
      case 1:
        imageCount = 4;
        break;
      case 2:
        imageCount = 6;
        break;
      case 3:
        imageCount = 9;
        break;
      default:
        imageCount = 4; // Set a default image count for unknown levels
    }

    console.log("Image count:", imageCount);

    const imageArray = images.slice(0, imageCount).map((image, index) => ({
      id: index + 1,
      url: `/animal/${image}`,
    }));


    res.json({ imageArray, level: req.userData.level });
  } catch (error) {
    console.error("Error in LevelLogic:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default LevelLogic;
