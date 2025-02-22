const mongoose = require("mongoose");
const FlipFrenzyModule = require("../Models/FlipFrenzy");

const addToDb = async (id, level) => {
  try {
    const user = await FlipFrenzyModule.findOne({ userId: id });
    if (user) {
      user.visitHistory.push({ timestamp: Date.now() }); // Store current timestamp
      await user.save(); // Save the updated document
      //console.log('User level updated and visit history recorded.');
    } else {
      const newUser = new FlipFrenzyModule({
        userId: id,
        level: level ? level : "1",
        visitHistory: [{ timestamp: Date.now() }],
      });
      await newUser.save();      
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

module.exports = addToDb;
