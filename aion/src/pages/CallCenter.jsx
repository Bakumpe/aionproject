import React from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";

function CallCustomerCare() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
        <div className="bodyTitle">
            {" "}
            <p>Customer Center</p>
          </div>
          <div className="customerCare">
            <h1>Customer Care</h1>
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
export default CallCustomerCare;
