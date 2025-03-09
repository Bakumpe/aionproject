import React, { useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import HomeProperty from "../components/HomeProperty";

function FetchData() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Properties</p>
          </div>
          <div className="myUnorderedList">
            <HomeProperty />
          </div>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default FetchData;
