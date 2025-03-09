import React from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
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
            <div className="ourservice-1-1">AionMov</div>
            <div className="ourservice-1-1">Cars For Rent</div>
            <div className="ourservice-1-1">Brokers</div>
            <div className="ourservice-1-1">Properties For sale</div>
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
