import React, { useContext, useState } from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import RegisterProperty from "../broker/RegisterProperty";
import { UserContext } from "../context/UserContext";

function Broker() {
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
            {" "}
            <p>Welcome, {user?.username}!</p>
          </div>
          <div className="welcome-message">
            <div className="welcomeMessage1">
              <p>We're thrilled to have you join our community.</p>
              <p>
                Looking for a place to rent or sell your car? You're in the
                right place!
              </p>
              <p>Let's get started on finding the perfect match for you.</p>
            </div>
          </div>
          <div className="register-button-group">
            <button onClick={() => setShowForm("property")}>
              Register Property
            </button>
            <button onClick={() => setShowForm("car")}>Register Car</button>
          </div>
          <div className="registeringProperty">
            {showForm && <RegisterProperty type={showForm} />}
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

export default Broker;
