import React from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import ServiceDetails from "../components/ServiceDetails";

function ServicePage() {
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
          <ServiceDetails />
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default ServicePage;
