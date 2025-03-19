import React from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";

function Recommendations() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <h1>Recommendations</h1>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default Recommendations;
