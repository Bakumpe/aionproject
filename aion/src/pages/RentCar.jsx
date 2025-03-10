import React, { useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import RentCar from "../components/RentCar";

function RentProperty() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Rent Details</p>
          </div>
          <RentCar />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default RentProperty;
