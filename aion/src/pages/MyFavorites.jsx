import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import PropertyResults from "../components/Search";

function MyFavorites() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
        <div className="bodyTitle">
            {" "}
            <p>Find Your Perfect Property That Meets Your Needs</p>
          </div>
          <PropertyResults />
        </div>
        <div className="sideBar">
          <Footer />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default MyFavorites;
