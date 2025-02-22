import { useContext, useState } from "react";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { GlobalContext } from "../Context/GlobalContext";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Loading from "../Components/Loader";

export default function InputRapidRecall() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("History");
  const [questions, setQuestions] = useState(5);
  const { dispatch, popSound,state } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const data = useLocation();
  const id = data.pathname.split("/")[1];
  const backendUrl = import.meta.env.VITE_BACKEND_PUBLISHABLE_KEY;
  const handleStart = () => {
    dispatch({ type: "Loading", payload: "RapidRecall" });
    if (questions > 0) {
      axios
        .post(`${backendUrl}/api/rapidrecall`, {
          id,
          QCategory: category.toLowerCase(),
          NoofQuestions: questions,
        })
        .then((response) => {
          dispatch({ type: "Loading", payload: "" });

          navigate("/idn_2t8GJLNc7vZgJOIEtBwgqnp1UiR/play", {
            state: {
              data: response.data,
              gameState: {
                isRapidRecall: true,
              },
            },
          });
        })
        .catch((error) => console.error("Error fetching questions:", error));
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#937EFC] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
            This is a Flash Card Swiper Game you can swipe left for incorrect
            statement and right for correct statement.
          </p>
        </div>
      )}

      <motion.h1
        className="special-text mb-20"
        animate={{ x: [10, 0, 10] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Card Swipe Game
      </motion.h1>
      {state.Loader ? <Loading /> :  <div>
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Left Card */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg w-full"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-montserrat mb-4 text-black">
              Enter A coustom Topic
            </h2>
            <input
              type="text"
              placeholder="Enter custom topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border text-black border-gray-400 rounded-md font-montserrat"
            />
            <h2 className="text-xl font-montserrat mt-4 mb-2 text-black">
              Or Choose one from below
            </h2>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border text-black border-gray-400 rounded-md font-montserrat"
            >
              <option>History</option>
              <option>Basic of IOT</option>
              <option>JavaScript Quiz</option>
            </select>
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="bg-gray-100 p-6 rounded-2xl shadow-lg w-full flex flex-col items-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-montserrat mb-4 text-black">
              Select Number of Questions
            </h2>
            <motion.button
              className="w-full p-3 bg-purple-500 text-white rounded-md mb-2 font-montserrat"
              onClick={() => setQuestions(5)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              5 Questions
            </motion.button>
            <motion.button
              className="w-full p-3 bg-purple-500 text-white rounded-md mb-2 font-montserrat"
              onClick={() => setQuestions(10)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              10 Questions
            </motion.button>
            <motion.button
              className="w-full p-3 bg-purple-500 text-white rounded-md font-montserrat"
              onClick={() => setQuestions(15)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              15 Questions
            </motion.button>
          </motion.div>
        </div>
        <motion.div className="pt-15  w-full text-center">
          <p className="text-white mb-4">
            Selected Number of Questions: {questions}
          </p>
          <Button text={" Start Now"} functions={handleStart} />
        </motion.div>
      </div>
}
    </motion.div>
  );
}
