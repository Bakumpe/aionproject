import React from "react";
import { Link } from "react-router-dom";
import Facebook from "../assets/facebook.png";
import Gmail from "../assets/gmail.png";
import Instagram from "../assets/instagram.png";
import Youtube from "../assets/youtube.png";
import Location from "../assets/location.png";
import Call from "../assets/call.png";
import Email from "../assets/email.png";
import C from "../assets/c.png"

function Footer() {
  return (
    <div className="footer">
      <div className="aionLogo">
        <div className="pngImages">
          <img src={Facebook} alt="Facebook" />
          <img src={Gmail} alt="Facebook" />
          <img src={Instagram} alt="Facebook" />
          <img src={Youtube} alt="Facebook" />
        </div>
      </div>
      <div className="section2">
        <div className="section2-1">
          <div className="section2-1-1">
            <p>Home Sweet Home</p>
            <div className="locationFooter">
              <img src={Location} alt="Location" />
              <p>Kampala, Uganda</p>
            </div>
            <div className="locationFooter">
              <img src={Call} alt="Location" />
              <p>+ 300-300-000</p>
            </div>
            <div className="locationFooter">
              <img src={Email} alt="Location" />
              <p>aionhouse@aionhouse.co</p>
            </div>
          </div>
          <div className="linksFooter">
            <div className="linkCategory">
              <p>Categories</p>
              <Link>Pricing Plans</Link>
              <Link>Our services</Link>
              <Link>About Us</Link>
              <Link>Contact Us</Link>
            </div>
            <div className="linkCategory">
              <p>Our Company</p>
              <Link>Become Part Of Us</Link>
              <Link>Our Agents</Link>
              <Link>Property Owners</Link>
              <Link>Properties</Link>
              <Link>Adminitration</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="rightsReserved">
        <img src={C} alt="C" />
        <p>2025 Aion Ltd. All Rights Reserved.</p>
      </div>
    </div>
  );
};
export default Footer