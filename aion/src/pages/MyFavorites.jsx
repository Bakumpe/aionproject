import React from "react";
import Header from "../components/Header";
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
            <p>Search Results</p>
          </div>
          <div>
            <PropertyResults />
          </div>
        </div>
      </div>
      <Whatsapp />
    </>
  );
}
export default MyFavorites;
