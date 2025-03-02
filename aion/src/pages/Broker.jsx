import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import "../styles/broker.css";
import RegisterProperty from "../broker/RegisterProperty";
import RegisterBroker from "../broker/RegisterBroker";
import { UserContext } from "../context/UserContext";
import useFetchProperties from "../hooks/fetchData";
import config from "../.config";
import "../styles/index.css";

function Broker() {
  const { user } = useContext(UserContext);
  const [isRegisteredBroker, setIsRegisteredBroker] = useState(false);

  // Fetch broker data only if the user is logged in
  const { data: brokerData, error } = useFetchProperties(
    user
      ? `${config.apiUrl}/api/brokers?filters=${user.id}&populate=user`
      : null
  );

  useEffect(() => {
    if (brokerData && brokerData.data && brokerData.data.length > 0) {
      setIsRegisteredBroker(true);
    } else {
      setIsRegisteredBroker(false);
    }
  }, [brokerData]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching broker data:", error);
    }
  }, [error]);

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          {isRegisteredBroker && (
            <div className="welcome-message">
              <h2>Welcome back, {user?.username}!</h2>{" "}
              {/* Personalized welcome message */}
              <p>We're glad to have you here.</p>
              <p>
                Please follow our community guidelines while registering
                property for our esteemed customers.
              </p>
            </div>
          )}
          {isRegisteredBroker ? (
            <RegisterProperty />
          ) : (
            <RegisterBroker setIsRegisteredBroker={setIsRegisteredBroker} />
          )}
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
