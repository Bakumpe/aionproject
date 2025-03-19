import React from "react";
import Header from "../components/Header";
import PropertyDetails from "../components/PropertyDetails";
import Whatsapp from "../components/Whatsapp";
import { Link } from "react-router-dom";

function PropertyPage() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>Property Details</p>
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
          </div>
          <PropertyDetails />
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default PropertyPage;
