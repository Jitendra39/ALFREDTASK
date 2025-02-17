import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LevelLogic = (req, res) => {
  try {
    // Path to the animal images directory (ensure folder name matches your public folder structure)
    const animalDir = path.join(__dirname, "../public/animal");
    console.log("Animal directory:", animalDir);
    
    // Read image files with valid extensions
    const images = fs
      .readdirSync(animalDir)
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Return a JSON array with IDs and URLs.
    // The URL assumes you have set up Express to serve static files from the "public" folder.
    const imageArray = images.map((image, index) => ({
      id: index + 1,
      url: `/animal/${image}`,
    }));

    res.json(imageArray);
  } catch (error) {
    console.error("Error in LevelLogic:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default LevelLogic;
 
