import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";

const FlipCard = ({ title, description1, description2 }) => {
  const { id } = useParams();
  //console.log(id);
  const [isFlipped, setIsFlipped] = useState(false);
  const Navigate = useNavigate();

  function handleClicked() {
    if (
      title ===
      "🧩 Flash Match: The Ultimate Memory Challenge! (Leitner System)"
    ) {
      Navigate(`/${id}/FlipFrenzy`);
    }else{
      Navigate(`/${id}/RapidRecall`);
    }
  }

  return (
    <>
      <motion.div
        onClick={() => handleClicked()}
        className="relative w-full h-64 md:h-80 cursor-pointer"
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-white p-6 md:p-10 shadow"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
            {title}
          </h2>
        </motion.div>
        <motion.div
          className="absolute w-full h-full bg-gray-100 p-6 md:p-10 rounded-lg flex flex-col items-center justify-center rotate-y-180 backface-hidden"
          initial={false}
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.5 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* <p className="text-base md:text-lg text-gray-700 text-center">
            {description}
          </p> */}
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            {description1}
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 text-center">
            {description2}
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FlipCard;
