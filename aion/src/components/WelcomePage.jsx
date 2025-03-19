import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../.config";

function WelcomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const myDisplayList = [
    "Perfect Home",
    "Real Estate",
    "Dream Home",
    "Dream Car",
    "Perfect Venue",
    "Dream Work Space",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % myDisplayList.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [myDisplayList.length]);

  return (
    <>
      <div className="welcomePage">
        <div className="myDisplayList">
          <p className="myDisplayList-1">Aion Finds Your</p>
          <p className="myDisplayList-2">{myDisplayList[currentIndex]}</p>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
