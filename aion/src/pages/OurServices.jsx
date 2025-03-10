import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Whatsapp from "../components/Whatsapp";

function OurServices() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Contact Your Service Provider</p>
          </div>
          <h1 className="ourservice">Service Providers</h1>
          <div className="ourservice-1">
            <div className="ourservice-1-1">Event Planners/Co-ordinators</div>
            <div className="ourservice-1-1">Personal Care and Wellness</div>
            <div className="ourservice-1-1">Home and Lifestyle Services</div>
            <div className="ourservice-1-1">Senior Care and Assistance</div>
          </div>
        </div>
        {/* <div className="sideBar">
          <Footer />
        </div> */}
      </div>

      <Whatsapp />
    </>
  );
}
export default OurServices;
