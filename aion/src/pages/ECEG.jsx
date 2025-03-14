import React from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import HomeProperty from "../components/HomeProperty";

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
          <div className="myUnorderedList">
            <HomeProperty />
          </div>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default ECEG;
