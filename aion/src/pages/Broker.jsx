import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import Registration from "../broker/Registration";
import { Link } from "react-router-dom";

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
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
          </div>
          <div className="welcome-message">
            <div className="welcomeMessage1">
              <p>Welcome to our community! We're thrilled to have you here.</p>
              <p>
                Whether you're looking to rent or sell your property, car, or
                service, you've come to the right place. Our team is dedicated
                to helping you every step of the way.
              </p>
              <p>
                Let's get started on finding the perfect match for you. If you
                need any assistance, our customer support team is here to help!
              </p>
              <p>
                Feel free to reach out at any time. We're just a call or click
                away.
              </p>
            </div>
          </div>
          <div className="register-button-group">
            <button onClick={() => setShowForm("property")}>
              Register Property
            </button>
            <button onClick={() => setShowForm("car")}>Register Car</button>
            <button onClick={() => setShowForm("service")}>
              Register Service
            </button>
          </div>
          <div className="registeringProperty">
            {showForm && <Registration type={showForm} />}
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
