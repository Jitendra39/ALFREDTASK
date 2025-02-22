import React, { useState, useEffect, useContext, use } from "react";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { useLocation, useNavigate, useParams } from "react-router";
import { GlobalContext } from "../Context/GlobalContext";
import axios from "axios";
import Loading from "../Components/Loader";

function BeforePlayScreen() {
  const backendUrl = import.meta.env.VITE_BACKEND_PUBLISHABLE_KEY;

  const { dispatch, popSound , state } = useContext(GlobalContext);

  const currentUrl = useLocation();
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const backgroundMusic = new Audio("/retro-music.mp3");
  const navigate = useNavigate();

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.2;
 
  const handlePlayNow = () => {
    dispatch({ type: "Loading", payload: "BeforePlayScreen" });
    popSound.play();
    axios
      .post(`${backendUrl}/flashcards/`, { id: id })
      .then((res) => {
        navigate(`/${id}/Play`, {
          state: {
            gameState: {
              isRapidRecall: currentUrl.pathname.includes("RapidRecall"),
            },
          },
        });

        dispatch({ type: "Loading", payload: "" });

      })
      .catch((err) => {
        console.error(err);
      });
  };

  const toggleMusic = () => {
    dispatch({ type: "PLAY_MUSIC" });
  };

  return (
    
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <div
              className="absolute top-4 left-4 w-16 h-16 bg-white cursor-pointer hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg border-4 border-purple-500"
              onClick={() => {
                setIsPopupOpen(!isPopupOpen);
                popSound.play();
              }}
            >
              <span className="text-black text-xl font-bold">i</span>
            </div>

            {isPopupOpen && (
              <div
                onClick={() => popSound.play()}
                className="absolute top-20 left-4 p-4 w-64 bg-white shadow-lg border border-gray-400 rounded-lg text-black"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">Information</h2>
                  <button className="text-lg font-bold">×</button>
                </div>
                <p className="mt-2 text-sm">
                  This is a Flash Card Memory Game using the Leitner System!
                </p>
              </div>
            )}

            <div
              className="absolute top-4 right-4 w-16 h-16 cursor-pointer bg-white hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg border-4 border-purple-500"
              onClick={toggleMusic}
            >
              <span className="text-black text-xl font-bold">🔊</span>
            </div>
            {state.Loader === "BeforePlayScreen" ? (
        <div className="flex items-center justify-center h-screen">
        <Loading />

        </div>
      ) : (

            <div className="flex flex-col items-center justify-center gap-30 md:gap-10  h-full">
              <div className="relative flex items-center h-10 justify-center">
                <div className="flex flex-col w-[70vw] gap-2 justify-center items-center mx-auto text-center bg-transparent h-screen">
                  <motion.p
                    className="special-text"
                    animate={{ x: [10, 0, 10] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Flash Card Memory Game
                  </motion.p>
                </div>
              </div>
              <div>
                <Button text={" Start Now"} functions={handlePlayNow} />
              </div>
            </div>
      )}
          </div>
        </>
 
  );
}

export default BeforePlayScreen;
