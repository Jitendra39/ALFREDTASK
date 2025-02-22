import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  useLocation, useNavigate } from "react-router";
import CardForRapidRecall from "../Components/CardForRapidRecall";
import Button from "../Components/Button";

export default function CardSwipe() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const data = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    // Assume state.data.data contains an array of questions.
    // Each question has { question: "...", answer: true/false }
    const addQB = async () => {
      setQuestions(data.state.data.data);
    };
    addQB();
  }, [data.state]);

  const handleSwipe = (direction) => {
    if (currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      // For a "right" swipe, the correct answer should be true,
      // for a "left" swipe, it should be false.
      const isCorrect =
        (direction === "right" && currentQuestion.answer === true) ||
        (direction === "left" && currentQuestion.answer === false);
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#937EFC] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className=" special-text text-4xl text-center font-bold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        True or False Game
      </motion.h1>
      <div className="mb-4 text-xl font-bold text-black">
        Number of Cards left: {questions.length - score}
      </div>
      {questions.length === 0 ? (
        <motion.div className="text-black text-lg">Loading questions...</motion.div>
      ) : currentIndex < questions.length ? (
        <motion.div
          key={currentIndex}
          // className="bg-white w-full max-w-md h-[400px] rounded-3xl shadow-2xl relative overflow-hidden"
          drag="x"
          dragElastic={0.2}
          onDragEnd={(event, info) => {
        
            if (info.offset.x > 100) {
              handleSwipe("right");
            } else if (info.offset.x < -100) {
              handleSwipe("left");
            }
          }}
        >
          {/* Top Dots */}
          {/* <div className="flex justify-center p-4 gap-2">
            <span className="bg-blue-500 inline-block w-4 h-4 rounded-full" />
            <span className="bg-purple-500 inline-block w-4 h-4 rounded-full" />
            <span className="bg-pink-500 inline-block w-4 h-4 rounded-full" />
          </div> */}
<CardForRapidRecall ques={questions.length} current={questions[currentIndex].question}/>
          {/* Card Content */}
          {/* <div className="card__content flex flex-col items-center justify-center h-full ">
            <p className="text-lg text-black text-center font-semibold">
              {questions[currentIndex].question}
            </p>
          </div> */}
        </motion.div>
      ) : (
        <motion.div className="mt-8 text-black text-2xl font-semibold text-center">
        <motion.div className="mt-8 text-black text-2xl font-semibold">
          Quiz Over! Score: {score} / {questions.length}
        </motion.div>
           <motion.div className="mt-8 text-black text-2xl font-semibold flex gap-32">
        <Button text={"Restart Now"} functions={() => window.location.reload()}/>
        <Button text={"Get Back To Menu"} functions={() => {
          navigate(`/${data.pathname.split("/")[1]}/RapidRecall`)
        }       }/>
            
            </motion.div>
  </motion.div>
      )}
    </motion.div>
  );
}



