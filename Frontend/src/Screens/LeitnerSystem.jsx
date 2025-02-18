import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import env from "react-dotenv";

function LeitnerSystem() {
  const backendUrl = "http://localhost:3000";
  console.log("backendUrl", {env});

  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const popSound = new Audio("/pop.mp3");
  const backgroundMusic = new Audio("/retro-music.mp3");
  const navigate = useNavigate();

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.3;

  const togglePopup = () => {
    popSound.play();
    setIsPopupOpen(!isPopupOpen);
  };

  const handlePlayNow = () => {
    console.log("LeitnerSystem",  backendUrl);
    popSound.play();
    fetch(`${backendUrl}/flashcards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        console.log(res);
       
    navigate(`/${id}/PlayScreen`);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMusic = () => {
    console.log("isMusicPlaying", isMusicPlaying);
    popSound.play();
    if (isMusicPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <>
          

      <div className="flex flex-col items-center justify-center h-screen">
        {/* Info Icon with Popup Trigger */}
        <div
          className="absolute top-4 left-4 w-16 h-16 bg-white cursor-pointer hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg border-4 border-purple-500"
          onClick={togglePopup}
        >
          <span className="text-black text-xl font-bold">i</span>
        </div>

        {/* Popup */}
        {isPopupOpen && (
          <div className="absolute top-20 left-4 p-4 w-64 bg-white shadow-lg border border-gray-400 rounded-lg text-black">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Information</h2>
              <button onClick={togglePopup} className="text-lg font-bold">
                ×
              </button>
            </div>
            <p className="mt-2 text-sm">
              This is a Flash Card Memory Game using the Leitner System!
            </p>
          </div>
        )}

        {/* Speaker Icon */}
        <div
          className="absolute top-4 right-4 w-16 h-16 cursor-pointer bg-white hover:bg-gray-300 rounded-full flex items-center justify-center shadow-lg border-4 border-purple-500"
          onClick={toggleMusic}
        >
          <span className="text-black text-xl font-bold">🔊</span>
        </div>

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
        <div className="mt-16">
          <Button text={" Start Now"} functions={handlePlayNow} />
        </div>
        {/* <div className="mt-8 space-y-4">
 
      </div> */}
      </div>
      {/* <motion.button
          whileTap={{ scale: 0.8 }}
          className="px-8 py-4 text-xl font-bold text-white bg-purple-500 hover:bg-purple-700 rounded-lg shadow-md"
          onClick={toggleMusic}
        >
          Start Now
        </motion.button> */}
    </>
  );
}

export default LeitnerSystem;
