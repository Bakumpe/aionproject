import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import { useMediaQuery } from "react-responsive";

function OurServices() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>{user?.username}! Are you looking for a service?</p>
          </div>
          <div className="welcome-message">
            <div className="welcomeMessage1">
              <p>
                Welcome to our community! We're absolutely thrilled to have you
                here.
              </p>
              <p>
                Looking for party service providers, event handlers, or
                something else? Look no further! We're here to connect you with
                a wide range of service providers who will make your dreams come
                true.
              </p>
              <p>
                Let's get started on finding the perfect solution together. Your
                success is our priority!
              </p>
            </div>
          </div>
          <h1 className="ourservice">Service Providers</h1>
          <div className="ourservice-1">
            <div className="ourservice-1-1">
              {isMobile ? "Event" : "Event Handlers"}
            </div>
            <div className="ourservice-1-1">
              {isMobile ? "My Care" : "Personal Care and Wellness"}
            </div>
            <div className="ourservice-1-1">
              {isMobile ? "House Help" : "Home and Lifestyle Services"}
            </div>
            <div className="ourservice-1-1">
              {isMobile ? "Shop" : "Restock Home Utilities"}
            </div>
          </div>
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default OurServices;
