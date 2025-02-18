
const MemoryCard = ({ image, isFlipped, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{ perspective: "1000px" }}
      className="cursor-pointer transform transition-transform duration-500
                 w-16 h-20 sm:w-24 sm:h-32 md:w-32 md:h-40
                 bg-blue-500 rounded-lg shadow-md flex items-center justify-center"
    >
      <div 
        className="w-full h-full flex items-center justify-center bg-white rounded-lg shadow-inner transform transition-transform duration-500
                   p-1 sm:p-2"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {isFlipped ? (
          <img 
            src={image} 
            alt="fruit" 
            className="object-cover
                       w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" 
          />
        ) : (
          <div className="w-full h-full bg-blue-400 rounded-lg"></div>
        )}
      </div>
    </div>
  );
};

export default MemoryCard;
