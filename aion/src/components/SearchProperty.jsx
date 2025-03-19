import React, { useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import MultiCategorySearch from "./Search";

function SearchProperty() {
  console.log("FetchData rendered"); // Confirm component mounts

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            <p>Search Properties, Cars and Services</p>
          </div>
          <div className="myUnorderedList">
            <MultiCategorySearch />
          </div>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default SearchProperty;