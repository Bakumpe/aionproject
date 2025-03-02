import React, { useEffect, useState } from "react";
import "../styles/whatsapp.css";
import Watsap from "../assets/watsap.png";

function Whatsapp() {
  const [isWhatsapp, setIsWhatsapp] = useState(false);

  const handleMouseOver = () => {
    setIsWhatsapp(true);
  };

  const handleMouseOut = () => {
    setIsWhatsapp(false);
  };

  return (
    <>
      <div
        className="whatsap"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div>
          {isWhatsapp && (
            <div className="message">Contact Us on our Whatsapp</div>
          )}
        </div>

        <div>
          <img src={Watsap} alt="Whatsapp" />
        </div>
      </div>
    </>
  );
}

export default Whatsapp;
