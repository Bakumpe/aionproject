import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import CustomerHelp from "../components/CustomerHelp";
import { UserContext } from "../context/UserContext";

function CallCustomerCare() {
  const { user } = useContext(UserContext);
  const [showForm, setShowForm] = useState(null);
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>{user?.username}! Customer Support is Here For You</p>
          </div>
          <div className="welcome-message">
            <div className="welcomeMessage1">
              <p>
                Welcome to our community! We're absolutely thrilled to have you
                here.
              </p>
              <p>
                If you're facing any challenges with registering your property
                or service, don't worry—you are not alone. Our dedicated support
                team is here to help you every step of the way.
              </p>
              <p>
                Let's get started on finding the perfect solution together. Your
                success is our priority!
              </p>
            </div>
          </div>
          <div className="register-button-group">
            <button onClick={() => setShowForm("contact us")}>
              Contact Us
            </button>
            <button onClick={() => setShowForm("support hours")}>
              Support Hours
            </button>
            <button onClick={() => setShowForm("faqs")}>
              Frequently Asked Questions
            </button>
            <button onClick={() => setShowForm("Support resources")}>
              Support resources
            </button>
          </div>
          <div className="registeringProperty">
            {showForm && <CustomerHelp type={showForm} />}
          </div>
        </div>
        <div className="footer">
          <p>Need assistance? Contact us anytime!</p>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}
export default CallCustomerCare;
