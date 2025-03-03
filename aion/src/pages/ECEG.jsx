import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import EasyComeEsyGo from "../eceg/ECEG";

function ECEG() {
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Easily Come In And Check Out Easily</p>
          </div>
          <EasyComeEsyGo />
        </div>
        <div className="sideBar">
          <Footer />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default ECEG;
