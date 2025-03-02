import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";

function PropertySettings() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <h1>Property Settings</h1>
        </div>
        <div className="sideBar">
          <Footer />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default PropertySettings;
