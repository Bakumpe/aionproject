import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Watsap from "../assets/watsap.png";

function Whatsapp() {
  return (
    <>
      <div className="whatsap">
        <NavLink to={'https://wa.me/256768520373'}>
          <img src={Watsap} alt="Whatsapp" />
        </NavLink>
      </div>
    </>
  );
}

export default Whatsapp;
