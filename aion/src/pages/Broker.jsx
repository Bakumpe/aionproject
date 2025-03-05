import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import "../styles/broker.css";
import RegisterProperty from "../broker/RegisterProperty";
import { UserContext } from "../context/UserContext";
import useFetchProperties from "../hooks/fetchData";
import config from "../.config";

function Broker() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="welcome-message">
            <div className="welcomeMessage1">
              <h2>Welcome back, {user?.username}!</h2>{" "}
              {/* Personalized welcome message */}
              <p>We're glad to have you here.</p>
              <p>
                Please follow our community guidelines while registering
                property for our esteemed customers.
              </p>
            </div>
          </div>
          <div className="registeringProperty">
            <RegisterProperty />
          </div>
        </div>

        <div className="sideBar">
          <Footer />
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default Broker;
