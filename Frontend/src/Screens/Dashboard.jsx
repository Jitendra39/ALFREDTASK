import React, { useState } from "react";
import FlipCard from "../Components/FlipCard";
import Navbar from "../Components/Navbar";

export default function Dashboard() {
  return (
    <>
    
      <Navbar />

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-12 text-slate-900">

      <div className="w-full max-w-7xl grid gap-10 md:grid-cols-2">
        <FlipCard
          title="🧩 Flash Match: The Ultimate Memory Challenge! (Leitner System)"
          description1="🎯 Match the Pairs!"
          description2="🔍 Test your memory & focus! Select two matching boxes—if they match, you score +1 point! If not, remember their positions and try again. Can you clear them all before time runs out? ⏳ "
        />

        <FlipCard
          title="    🚀 FlashCard Challenge: Test Your Memory & Speed!"
          description1="      🧠 Test Your Knowledge!"
          description2="Think fast! If the statement is correct, earn +1 point; if incorrect, try again and learn from your mistakes!"
        />
      </div>
    </div>
    </>
  );
}
