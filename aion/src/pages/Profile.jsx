import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";


function Profile() {
  const { user } = useContext(UserContext);
  const [cardTitle, setCardTitle] = useState("Your Details");
  const [movingType, setMovingType] = useState("");


  const handleCardType = (type) => {
    setCardTitle(type);
    setMovingType(type);
  };

  const renderCardComponent = () => {
    switch (movingType) {
      case "Property Owners Register":
        return ;
      case "Brokers Register":
        return ;
      case "Service Providers Register":
        return ;
      default:
        return null;
    }
  };

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
          <div className="profile">
            <div className="profile1">
              {["Profile Card", "Property Owners Register", "Brokers Register", "Service Providers Register"].map((type) => (
                <div key={type} className="profile2" onClick={() => handleCardType(type)}>
                  {type}
                </div>
              ))}
            </div>
            <div className="movingDetails">
              <div className="heading">{cardTitle}</div>
              <div>{renderCardComponent()}</div>
            </div>
          </div>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default Profile;
