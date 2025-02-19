const mongoose = require('mongoose');
const flashCardModule = require('../Models/flashcard');
 

const updateScore = async (userId, newLevel, score) => {
  try {
    const flashcard = await flashCardModule.findOne({ userId });

    if (!flashcard) {
      throw new Error('Flashcard not found');
    }

    flashcard.level = newLevel >= 3 ? 3 : newLevel + 1;
    flashcard.history.push(score);
    flashcard.visitHistory.push({ timestamp: Date.now() });

    await flashcard.save();
    return flashcard;
  } catch (error) {
    console.error('Error updating score:', error);
    throw error;
  }
};

module.exports = updateScore;