import React, { useEffect, useState } from "react";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
];

const Grid: React.FC = () => {
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState("");
  const isMobile = window.innerWidth < 768;
  const mobileCell = 35;
  const pcCell = 144;

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomIndex = () => {
    return Math.floor(Math.random() * 36);
  };

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        const randomIndex = getRandomIndex();
        setActiveCell(randomIndex);
        setBgColor(getRandomColor());
        setTimeout(() => {
          setActiveCell(null);
          setBgColor("");
        }, 1000);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setActiveCell(index);
      setBgColor(getRandomColor());
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveCell(null);
      setBgColor("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="grid grid-cols-5 sm:grid-cols-12 grid-rows-7 sm:grid-rows-12 h-screen w-screen border border-gray-400">
        {Array.from({ length: isMobile ? mobileCell : pcCell }).map((_, index) => (
          <div
            key={index}
            className={`border border-gray-200 transition duration-300 ease-in-out flex items-center justify-center ${
              activeCell === index ? bgColor : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
