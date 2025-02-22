import { useEffect } from "react";
import axios from "axios";

// --- API Calls ---

// Update flashcard after win
export const updateFlashcard = async (url, id, level, win, matchCount) => {
  try {
    const response = await axios.put(
      `${url}/flashcards/${id}`,
      { level, win, matchCount, id },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating flashcard:", error);
  }
};

export const useUpdateFlashcard = ({ id, level, win, matchCount, url }) => {
  useEffect(() => {
    if (win) {
      updateFlashcard(url, id, level, win, matchCount);
    }
  }, [win, id, level, matchCount, url]);
};

export const getAllCards = async (url, id) => {
  try {
    const response = await axios.get(`${url}/flashcards?id=${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const useFetchLevel = ({ id, url, setLevel }) => {
  useEffect(() => {
    const fetchLevel = async () => {
      const data = await getAllCards(url, id);
      if (data) {
        const levelFromApi = parseInt(data.level);
        setLevel(levelFromApi);
      }
    };
    fetchLevel();
  }, [id, url, setLevel]);
};

// --- Deck & Matching Logic ---

// Create a shuffled deck based on the current level and provided images
export const createShuffledDeck = (level, imagesSource, config) => {
  const totalCards = config[level]?.rows * config[level]?.cols;
  const pairs = totalCards / 2;
  const deckImages = [];
  for (let i = 0; i < pairs; i++) {
    deckImages.push(imagesSource[i % imagesSource.length]);
  }
  // Duplicate the deck and shuffle it
  return [...deckImages, ...deckImages].sort(() => Math.random() - 0.5);
};

export const useDeckCreation = ({
  level,
  imagesSource,
  mobileConfig,
  setDisplayDeck,
  setWin,
}) => {
  useEffect(() => {
    const deck = createShuffledDeck(level, imagesSource, mobileConfig);
    setDisplayDeck(deck);
    // Reset win status whenever a new deck is created
    setWin(false);
  }, [level, imagesSource, mobileConfig, setDisplayDeck, setWin]);
};

// Matching & Flip Logic
export const useCardMatching = ({
  flippedIndices,
  displayDeck,
  setMatchedIndices,
  setMatchCount,
  setFlippedIndices,
}) => {
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      // Check if the two flipped cards match
      if (displayDeck[firstIndex] === displayDeck[secondIndex]) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        setMatchCount((prev) => prev + 1);
        // Delay clearing flips to allow the match animation to complete
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      } else {
        // If no match, flip them back after a delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [
    flippedIndices,
    displayDeck,
    setMatchedIndices,
    setMatchCount,
    setFlippedIndices,
  ]);
};

export const useWinCheck = ({ displayDeck, matchedIndices, setWin }) => {
  useEffect(() => {
    if (displayDeck.length > 0 && matchedIndices.length === displayDeck.length) {
      const timer = setTimeout(() => {
        setWin(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [matchedIndices, displayDeck, setWin]);
};
