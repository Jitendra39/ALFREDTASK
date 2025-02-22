import React from "react";

const Arrow = ({ direction, text  }) => {
  return (
    <div className="flex items-center gap-2">
      {direction === "left" ? (
        <>
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      <span className="text-black">{text}</span>

        </>
      ) : (
        <>
      <span className="text-black">{text}</span>

        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Right arrow icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        </>
      )}
    </div>
  );
};

export default Arrow;
