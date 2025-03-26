import React, { useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";

function AboutUs() {
  const [showHeader, setShowHeader] = useState(false);

  const toggleHeader = () => {
    setShowHeader(!showHeader);
  };

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <button className="headerIcon" onClick={toggleHeader}>
            x
          </button>
          {showHeader && <Header />}
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>Properties</p>
          </div>
          <h1>About Us</h1>
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default AboutUs;
