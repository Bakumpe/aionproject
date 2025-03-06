import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import UpdateUser from "../components/UpdateUserData";
// import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import ProfileCard from "../components/ProfileCard";
import RegisterAsOwner from "../broker/RegisterAsOwner";
import RegisterBroker from "../broker/RegisterBroker";
import RegisterAsServiceProvider from "../broker/RegisterAsServiceProvider";

function Profile() {
  const [isUpdateVisible, setIsUpdateVisible] = useState(false); // State for showing UpdateUser
  const [isDisabled, setIsDisabled] = useState(false);
  const [cardTitle, setCardTitle] = useState("Your Details");
  const [movingType, setMovingType] = useState("");

  useEffect(() => {
    const lastUpdate = localStorage.getItem("lastUpdate");
    if (lastUpdate) {
      const now = new Date();
      const lastUpdateDate = new Date(lastUpdate);
      const diffInDays = (now - lastUpdateDate) / (1000 * 60 * 60 * 24);
      if (diffInDays < 30) {
        setIsDisabled(true);
      }
    }
  }, []);

  const handleUpdateClick = () => {
    if (isDisabled) {
      alert("You can only update your profile once a month.");
    } else {
      setIsUpdateVisible(!isUpdateVisible); // Toggle the visibility of UpdateUser
    }
  };

  const handleCardType = (type) => {
    setCardTitle(type);
    setMovingType(type);
  };

  const renderCardComponent = () => {
    switch (movingType) {
      case "Profile Card":
        return <ProfileCard />;
      case "Property Owners Register":
        return <RegisterAsOwner />;
      case "Brokers Register":
        return <RegisterBroker />;
      case "Service Providers Register":
        return <RegisterAsServiceProvider />;
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
            <p>Profile</p>
          </div>
          <div className="moving">
            <div className="moving1">
              {["Profile Card", "Property Owners Register", "Brokers Register", "Service Providers Register"].map((type) => (
                <div key={type} className="moving2" onClick={() => handleCardType(type)}>
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
        {/* <div className="sideBar">
          <Footer />
        </div> */}
      </div>

      <Whatsapp />
    </>
  );
}

export default Profile;
