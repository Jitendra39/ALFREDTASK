const mongoose = require("mongoose");
const flashCardModule = require("../Models/flashcard");

const addToDb = async (id, level) => {
  try {
    const user = await flashCardModule.findOne({ userId: id });
    if (user) {
      user.visitHistory.push({ timestamp: Date.now() }); // Store current timestamp
      await user.save(); // Save the updated document
      //console.log('User level updated and visit history recorded.');
    } else {
      const newUser = new flashCardModule({
        userId: id,
        level: level ? level : "1",
        visitHistory: [{ timestamp: Date.now() }],
      });
      await newUser.save();
      //console.log('New user created with level 1.');
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

module.exports = addToDb;
