import React, { createContext, useReducer } from 'react';

const initialState = {
  flashcards: [],
  currentFlashcard: null,
  isMusicPlaying: false,
};

const GlobalContext = createContext(initialState);
const backgroundMusic = new Audio("/retro-music.mp3");


const globalReducer = (state, action) => {
  switch (action.type) {
    case 'PLAY_MUSIC':
      const newMusicState = !state.isMusicPlaying;
      toggleMusic(newMusicState);
      return {
        ...state,
        isMusicPlaying: newMusicState,
      };
 
    default:
      return state;
  }
};
const toggleMusic = (isMusicPlaying) => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
  } else {
    backgroundMusic.play();
  }
};




const GlobalProvider = ({ children }) => {
const popSound = new Audio("/pop.mp3");

  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch, popSound }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };