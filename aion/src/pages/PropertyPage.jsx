import React from "react";
import Header from "../components/Header";
import PropertyDetails from "../components/PropertyDetails";
import Whatsapp from "../components/Whatsapp";

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
          </div>
          <PropertyDetails />
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default PropertyPage;
