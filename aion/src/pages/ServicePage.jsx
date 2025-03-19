import React from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import ServiceDetails from "../components/ServiceDetails";
import { Link } from "react-router-dom";

function ServicePage() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>Service Details</p>
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
          </div>
          <ServiceDetails />
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default ServicePage;
