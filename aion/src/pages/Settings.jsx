import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import "../styles/settings.css"

function Settings() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <h1 className="settings">Settings</h1>
        </div>
        <div className="sideBar">
          {" "}
          <Footer />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default Settings;
