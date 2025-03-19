import React from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import HomeProperty from "../components/HomeProperty";
import { Link } from "react-router-dom";

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
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
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
