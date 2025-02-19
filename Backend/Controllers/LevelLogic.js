import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LevelLogic = (req, res) => {
  try {

  // const Images = [
  //   'bear.png',     'cat.jpeg',
  //   'cheetah.jpg',  'cow.jpg',
  //   'croc.jpg',     'doggo.jpg',
  //   'donkey.jpg',   'fox.jpg',
  //   'hippo.png',    'horse.png',
  //   'kangaroo.png', 'lion.jpg',
  //   'panda.jpg',    'pig.jpg',
  //   'sheep.jpg',    'turtle.jpg'
  // ]

  //   const imageArray = Images.map((image, index) => ({
  //     id: index + 1,
  //     url: `/animal/${image}`,
  //   }));


    res.json({ level: req.userData.level });
  } catch (error) {
    console.error("Error in LevelLogic:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default LevelLogic;
