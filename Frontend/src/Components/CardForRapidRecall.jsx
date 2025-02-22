import React from 'react';

const CardForRapidRecall = ({ ques, current }) => {
  return (
    // <div
    //   className="font-sans text-[1.5rem] leading-[1.4] "
    //   style={{ marginInline: "max(0px, ((100% - 260px) / 2))" }}
    // >
      <div
        className="sticky top-0 bg-white p-10 rounded w-80 h-80 text-3xl text-black shadow-[0_-0.5rem_1rem_rgba(0,0,0,0.15)] mb-4"
        style={{ top: `1rem`, transform: `rotate(1deg)` }}
      >
        <p>{current}</p>
      </div>
    // </div>
  );
};

export default CardForRapidRecall;
