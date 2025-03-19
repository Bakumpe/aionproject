import React, { useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import ServiceProperty from "../components/ServiceProperty";
import { Link } from "react-router-dom";

function Events() {
  // console.log("FetchData rendered"); // Confirm component mounts

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            <p>Services</p>
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
          </div>
          <div className="myUnorderedList">
            <ServiceProperty />
          </div>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default Events;