import React, { useState, useEffect, useRef } from "react";

const CardForRapidRecall = ({ ques, current }) => {
  const [fontSize, setFontSize] = useState(48); // Initial font size
  const containerRef = useRef(null);

  useEffect(() => {
    const adjustFontSize = () => {
      const container = containerRef.current;
      if (!container) return;

      let newSize = 28; // Start with a large font size
      container.style.fontSize = `${newSize}px`;

      // Reduce font size until content fits within the box
      while (
        container.scrollHeight > container.clientHeight ||
        container.scrollWidth > container.clientWidth
      ) {
        newSize -= 1;
        container.style.fontSize = `${newSize}px`;
        if (newSize <= 12) break; // Minimum font size
      }

      setFontSize(newSize);
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [current]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 bg-white p-10 rounded w-80 h-80 text-black shadow-[0_-0.5rem_1rem_rgba(0,0,0,0.15)] mb-4 flex justify-center items-center text-center"
      style={{
        top: "1rem",
        transform: "rotate(1deg)",
        fontSize: `${fontSize}px`,
      }}
    >
      <p>{current}</p>
    </div>
  );
};

export default CardForRapidRecall;
