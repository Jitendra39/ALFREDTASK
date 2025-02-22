import { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import MemoryCard from "../Components/MemoryCard";
import Button from "../Components/Button";
import Counter from "../Components/Counter";
import { GlobalContext } from "../Context/GlobalContext";
import {
  useUpdateFlashcard,
  useFetchLevel,
  useDeckCreation,
  useCardMatching,
  useWinCheck,
} from "./FlipFrenzyLogic"; // Adjust the path as needed

// Default images in case API images aren't available
const defaultFruits = [
  "/animal/bear.png",
  "/animal/cat.jpeg",
  "/animal/cheetah.jpg",
  "/animal/cow.jpg",
  "/animal/croc.jpg",
  "/animal/doggo.jpg",
  "/animal/donkey.jpg",
  "/animal/fox.jpg",
  "/animal/hippo.png",
  "/animal/horse.png",
  "/animal/kangaroo.png",
  "/animal/lion.jpg",
  "/animal/panda.jpg",
  "/animal/pig.jpg",
  "/animal/sheep.jpg",
  "/animal/turtle.jpg",
];

const FlipFrenzy = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_BACKEND_PUBLISHABLE_KEY;
  const [level, setLevel] = useState(1);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const { popSound } = useContext(GlobalContext);
  const [displayDeck, setDisplayDeck] = useState([]);
  const [win, setWin] = useState(false);

  // API side effects
  useUpdateFlashcard({ id, level, win, matchCount, url });
  useFetchLevel({ id, url, setLevel });

  // Use default images (or substitute with API images as needed)
  const imagesSource = defaultFruits;

  // Layout configurations
  const mobileConfig = useMemo(() => ({
    1: { rows: 4, cols: 2 },
    2: { rows: 4, cols: 3 },
    3: { rows: 4, cols: 4 },
  }), []);
  

  const pcConfig = useMemo(() => ({
    1: { rows: 2, cols: 4 },
    2: { rows: 3, cols: 4 },
    3: { rows: 4, cols: 4 },
  }), []);

  // Create deck and reset win state when level or images change
  useDeckCreation({ level, imagesSource, mobileConfig, setDisplayDeck, setWin });
  // Check matching logic on flipped cards
  useCardMatching({
    flippedIndices,
    displayDeck,
    setMatchedIndices,
    setMatchCount,
    setFlippedIndices,
  });
  // Check if all cards have been matched
  useWinCheck({ displayDeck, matchedIndices, setWin });

  // Handle card flip action
  const handleFlip = (index) => {
    popSound.play();
    // Prevent flipping if card is already flipped/matched or if two cards are already open.
    if (
      flippedIndices.includes(index) ||
      matchedIndices.includes(index) ||
      flippedIndices.length === 2
    )
      return;
    setFlippedIndices((prev) => [...prev, index]);
  };

  // Define card size classes for mobile and PC layouts
  const mobileCardSizeClass =
    level === 1 ? "w-24 h-32" : level === 2 ? "w-20 h-28" : "w-16 h-24";
  const pcCardSizeClass =
    level === 1 ? "w-20 h-28" : level === 2 ? "w-16 h-24" : "w-14 h-20";

  return (
    <div className="relative flex flex-col justify-center items-center min-h-full mt-8 md:mt-2 px-2">
      {/* Floating Level & Match Counter */}
      <div className="flex flex-col items-center pb-10 md:pb-0">
        <motion.p
          className={`special-text text-lg ${
            level !== 3 ? "mt-8" : "md:mt-1"
          } sm:text-xl md:text-2xl font-bold text-white`}
          animate={{ x: [10, 0, 10] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Level {level}
        </motion.p>
        <p
          className={`md:mt-0 mt-2 ${
            level === 3 && "md:h-0 md:w-0"
          } sm:text-base md:text-lg main-content font-extrabold visible md:invisible text-white`}
        >
          Matches: {matchCount}
        </p>
      </div>
      <div className="flex absolute right-8 invisible md:visible top-2 ">
        <Counter value={matchCount} name={"Matches"} />
      </div>

      {/* --- Mobile Layout --- */}
      <div className="flex flex-col gap-2 p-2 sm:p-4 bg-transparent rounded-lg w-full max-w-lg md:hidden">
        {displayDeck.length > 0 &&
          Array.from({ length: mobileConfig[level]?.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 sm:gap-3 md:gap-4">
              {displayDeck
                .slice(
                  rowIndex * mobileConfig[level].cols,
                  rowIndex * mobileConfig[level].cols + mobileConfig[level].cols
                )
                .map((image, colIndex) => {
                  const cardIndex = rowIndex * mobileConfig[level].cols + colIndex;
                  return (
                    <div
                      key={cardIndex}
                      className="relative"
                      style={{
                        visibility: matchedIndices.includes(cardIndex)
                          ? "hidden"
                          : "visible",
                      }}
                    >
                      <MemoryCard
                        image={image}
                        isFlipped={flippedIndices.includes(cardIndex)}
                        onClick={() => handleFlip(cardIndex)}
                        sizeClass={mobileCardSizeClass}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
      </div>

      {/* --- PC Layout --- */}
      <div className="hidden md:flex flex-col gap-2 p-2 sm:p-4 bg-transparent rounded-lg w-full max-w-lg">
        {displayDeck.length > 0 &&
          Array.from({ length: pcConfig[level]?.rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2 sm:gap-3 md:gap-4">
              {displayDeck
                .slice(
                  rowIndex * pcConfig[level].cols,
                  rowIndex * pcConfig[level].cols + pcConfig[level].cols
                )
                .map((image, colIndex) => {
                  const cardIndex = rowIndex * pcConfig[level].cols + colIndex;
                  return (
                    <div
                      key={cardIndex}
                      className="relative"
                      style={{
                        visibility: matchedIndices.includes(cardIndex)
                          ? "hidden"
                          : "visible",
                      }}
                    >
                      <MemoryCard
                        image={image}
                        isFlipped={flippedIndices.includes(cardIndex)}
                        onClick={() => handleFlip(cardIndex)}
                        sizeClass={pcCardSizeClass}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
      </div>

      {/* --- Win Overlay --- */}
      {win && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-75">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white text-4xl font-bold mb-4"
          >
            You Win!
          </motion.div>
          <div onClick={() => window.location.reload()}>
            <Button text="Play Next Level" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlipFrenzy;



































// import { useState, useEffect, useContext } from "react";
// import MemoryCard from "../Components/MemoryCard";
// import { motion } from "framer-motion";
// import { useParams } from "react-router";
// import Button from "../Components/Button";
// import { GlobalContext } from "../Context/GlobalContext";
// import Counter from "../Components/Counter";
// import axios from "axios";

// // Default images in case API images aren't available
// const defaultFruits = [
//   "/animal/bear.png",
//   "/animal/cat.jpeg",
//   "/animal/cheetah.jpg",
//   "/animal/cow.jpg",
//   "/animal/croc.jpg",
//   "/animal/doggo.jpg",
//   "/animal/donkey.jpg",
//   "/animal/fox.jpg",
//   "/animal/hippo.png",
//   "/animal/horse.png",
//   "/animal/kangaroo.png",
//   "/animal/lion.jpg",
//   "/animal/panda.jpg",
//   "/animal/pig.jpg",
//   "/animal/sheep.jpg",
//   "/animal/turtle.jpg",
// ];

// const FlipFrenzy = () => {
//   const { id } = useParams();
//   const url = import.meta.env.VITE_BACKEND_PUBLISHABLE_KEY;
//   const [level, setLevel] = useState(1);
//   const [flippedIndices, setFlippedIndices] = useState([]);
//   const [matchedIndices, setMatchedIndices] = useState([]);
//   const [matchCount, setMatchCount] = useState(0);

//   const { popSound } = useContext(GlobalContext);
//   const [displayDeck, setDisplayDeck] = useState([]);

//   const [win, setWin] = useState(false);

//   useEffect(() => {
//     const updateFlashcard = async () => {
//       try {
//       const response = await axios.put(`${url}/flashcards/${id}`, {
//         level,
//         win,
//         matchCount,
//         id,
//       }, {
//         headers: {
//         "Content-Type": "application/json",
//         },
//       });
//       const data = response.data;
//       //console.log("Update response", data);
//       } catch (error) {
//       console.error("Error updating flashcard:", error);
//       }
//     };

//     if (win) {
//       updateFlashcard();
//     }
//   }, [win]);

//   const getAllCards = async () => {
//     try {
//       const response = await axios.get(`${url}/flashcards?id=${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = response.data;
//       //console.log("Data from API", data);
//       const levelFromApi = parseInt(data.level);
//       setLevel(levelFromApi);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getAllCards();
//   }, [id]);

//   // Use API images if available; otherwise fallback to defaults.
//   const imagesSource = defaultFruits;

//   // --- Layout configurations ---
//   const mobileConfig = {
//     1: { rows: 4, cols: 2 },
//     2: { rows: 4, cols: 3 },
//     3: { rows: 4, cols: 4 },
//   };

//   const pcConfig = {
//     1: { rows: 2, cols: 4 },
//     2: { rows: 3, cols: 4 },
//     3: { rows: 4, cols: 4 },
//   };

//   // Create the stable deck only once (or when level/imagesSource change)
//   useEffect(() => {
//     const totalCards = mobileConfig[level]?.rows * mobileConfig[level]?.cols;
//     const pairs = totalCards / 2;
//     const deckImages = [];
//     for (let i = 0; i < pairs; i++) {
//       deckImages.push(imagesSource[i % imagesSource.length]);
//     }
//     // Duplicate the deck and shuffle
//     const deck = [...deckImages, ...deckImages].sort(() => Math.random() - 0.5);
//     setDisplayDeck(deck);
//     // Reset win status if deck is re-created
//     setWin(false);
//   }, [level, imagesSource]);

//   // --- State for card flip & match logic ---

//   const handleFlip = (index) => {
//     popSound.play();
//     // Prevent clicking if already flipped/matched or two cards are already flipped.
//     if (
//       flippedIndices.includes(index) ||
//       matchedIndices.includes(index) ||
//       flippedIndices.length === 2
//     )
//       return;
//     setFlippedIndices((prev) => [...prev, index]);
//   };

//   useEffect(() => {
//     if (flippedIndices.length === 2) {
//       const [firstIndex, secondIndex] = flippedIndices;
//       if (displayDeck[firstIndex] === displayDeck[secondIndex]) {
//         // If they match, update matchedIndices and matchCount.
//         setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
//         setMatchCount((prev) => prev + 1);
//         setTimeout(() => {
//           setFlippedIndices([]);
//         }, 1000);
//       } else {
//         // If not a match, flip them back after 1 second.
//         setTimeout(() => {
//           setFlippedIndices([]);
//         }, 1000);
//       }
//     }
//   }, [flippedIndices, displayDeck]);

//   // --- Check for Win Condition ---
//   useEffect(() => {
//     // When all cards are matched (i.e. hidden), show win message.
//     if (
//       displayDeck.length > 0 &&
//       matchedIndices.length === displayDeck.length
//     ) {
//       // Wait 1 second (same as card hide delay) then set win to true.
//       const timer = setTimeout(() => {
//         setWin(true);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [matchedIndices, displayDeck]);

//   // --- Define card size classes for each layout ---
//   const mobileCardSizeClass =
//     level === 1 ? "w-24 h-32" : level === 2 ? "w-20 h-28" : "w-16 h-24";
//   const pcCardSizeClass =
//     level === 1 ? "w-20 h-28" : level === 2 ? "w-16 h-24" : "w-14 h-20";

//   return (
//     <div className="relative flex flex-col justify-center items-center min-h-full mt-8 md:mt-2  px-2">
//       {/* Floating Level & Match Counter */}
//       <div className="flex flex-col items-center pb-10 md:pb-0">
//         <motion.p
//           className={`special-text text-lg ${
//             level !== 3 ? "mt-8" : "md:mt-1"
//           } sm:text-xl md:text-2xl font-bold text-white`}
//           animate={{ x: [10, 0, 10] }}
//           transition={{ duration: 1, repeat: Infinity }}
//         >
//           Level {level}
//         </motion.p>
//         <p
//           className={`md:mt-0 mt-2 ${
//             level === 3 && "md:h-0 md:w-0"
//           } sm:text-base md:text-lg main-content font-extrabold visible md:invisible text-white`}
//         >
//           Matches: {matchCount}
//         </p>
//       </div>
//       <div className="flex absolute right-8 invisible md:visible top-2 ">
//         <Counter value={matchCount} name={"Matches"} />
//       </div>
//       {/* --- Mobile Layout (visible on small screens) --- */}
//       <div className="flex flex-col gap-2 p-2 sm:p-4 bg-transparent rounded-lg w-full max-w-lg md:hidden">
//         {displayDeck.length > 0 &&
//           Array.from({ length: mobileConfig[level]?.rows }).map(
//             (_, rowIndex) => (
//               <div
//                 key={rowIndex}
//                 className="flex justify-center gap-2 sm:gap-3 md:gap-4"
//               >
//                 {displayDeck
//                   .slice(
//                     rowIndex * mobileConfig[level].cols,
//                     rowIndex * mobileConfig[level].cols +
//                       mobileConfig[level].cols
//                   )
//                   .map((image, colIndex) => {
//                     const cardIndex =
//                       rowIndex * mobileConfig[level].cols + colIndex;
//                     return (
//                       <div
//                         key={cardIndex}
//                         className="relative"
//                         // Hide card by setting visibility to hidden if matched
//                         style={{
//                           visibility: matchedIndices.includes(cardIndex)
//                             ? "hidden"
//                             : "visible",
//                         }}
//                       >
//                         <MemoryCard
//                           image={image}
//                           isFlipped={flippedIndices.includes(cardIndex)}
//                           onClick={() => handleFlip(cardIndex)}
//                           sizeClass={mobileCardSizeClass}
//                         />
//                       </div>
//                     );
//                   })}
//               </div>
//             )
//           )}
//       </div>

//       {/* --- PC Layout (visible on md and larger screens) --- */}
//       <div className="hidden md:flex flex-col gap-2 p-2 sm:p-4 bg-transparent rounded-lg w-full max-w-lg">
//         {displayDeck.length > 0 &&
//           Array.from({ length: pcConfig[level]?.rows }).map((_, rowIndex) => (
//             <div
//               key={rowIndex}
//               className="flex justify-center gap-2 sm:gap-3 md:gap-4"
//             >
//               {displayDeck
//                 .slice(
//                   rowIndex * pcConfig[level].cols,
//                   rowIndex * pcConfig[level].cols + pcConfig[level].cols
//                 )
//                 .map((image, colIndex) => {
//                   const cardIndex = rowIndex * pcConfig[level].cols + colIndex;
//                   return (
//                     <div
//                       key={cardIndex}
//                       className="relative"
//                       style={{
//                         visibility: matchedIndices.includes(cardIndex)
//                           ? "hidden"
//                           : "visible",
//                       }}
//                     >
//                       <MemoryCard
//                         image={image}
//                         isFlipped={flippedIndices.includes(cardIndex)}
//                         onClick={() => handleFlip(cardIndex)}
//                         sizeClass={pcCardSizeClass}
//                       />
//                     </div>
//                   );
//                 })}
//             </div>
//           ))}
//       </div>

//       {/* --- Win Overlay --- */}
//       {win && (
//         <div className="absolute inset-0 flex flex-col items-center  justify-center bg-opacity-75">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-white text-4xl font-bold mb-4"
//           >
//             You Win!
//           </motion.div>
//           <div onClick={() => window.location.reload()}>
//             <Button text="Play Next Level" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlipFrenzy;
