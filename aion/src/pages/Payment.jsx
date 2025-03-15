import React from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import ProceedPayment from "../components/ProceedPayment";


function Payment() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
          <p>Please Subscribe</p>
          </div>
          <ProceedPayment/>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default Payment;
