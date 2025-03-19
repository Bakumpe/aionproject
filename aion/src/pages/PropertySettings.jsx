import React from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import { Link } from "react-router-dom";

function PropertySettings() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <h1>Property Settings</h1>
          <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default PropertySettings;
