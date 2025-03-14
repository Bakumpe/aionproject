import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom"; // Changed to useNavigate
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import { useMediaQuery } from "react-responsive";

function OurServices() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const navigate = useNavigate(); // Initialize the hook

  const handleregister = () => {
    navigate("/registerservice");
  };

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
          <div className="register-button-group">
            <button className="ourservice-1-1" onClick={handleregister}>
              {isMobile ? "Event" : "Event Handlers"}
            </button>
            <button className="ourservice-1-1" onClick={handleregister}>
              {isMobile ? "My Care" : "Personal Care and Wellness"}
            </button>
            <button className="ourservice-1-1" onClick={handleregister}>
              {isMobile ? "House Help" : "Home and Lifestyle Services"}
            </button>
            <button className="ourservice-1-1" onClick={handleregister}>
              {isMobile ? "Shop" : "Restock Home Utilities"}
            </button>
          </div>
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default OurServices;