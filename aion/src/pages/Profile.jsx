import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Add useLocation
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Notifications from "../notifications/Notifications";
import ProfileCard from "../profile/ProfileCard";
import Register from "../broker/Register";

function Profile() {
  const { user } = useContext(UserContext);
  const location = useLocation(); // Get location to access state
  const [cardTitle, setCardTitle] = useState("Your Details");
  const [activeSection, setActiveSection] = useState("Profile Card"); // Changed default

  // Handle section change from navigation state
  useEffect(() => {
    if (location.state?.activeSection) {
      handleSectionChange(location.state.activeSection);
    }
  }, [location.state]);

  const handleSectionChange = (section) => {
    switch (section) {
      case "Profile Card":
        setCardTitle("Your Profile");
        setActiveSection("Profile Card");
        break;
      case "Notifications":
        setCardTitle("Your Notifications");
        setActiveSection("Notifications");
        break;
      case "Register":
        setCardTitle("Registration Details");
        setActiveSection("Register");
        break;
      default:
        setCardTitle("Your Details");
        setActiveSection("Profile Card");
    }
  };

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "Profile Card":  // Changed from "Profile"
        return <ProfileCard />;
      case "Notifications":
        return <Notifications />;
      case "Register":
        return <Register />;
      default:
        return <ProfileCard />;
    }
  };

  return (
    <div className="indexPage">
      <div className="navBar">
        <Header />
      </div>
      <div className="body">
        <div className="bodyTitle">
          <p>Welcome, {user?.username || "Guest"}!</p>
          <Link to="/search" className="searchme">
            <div>Search For Properties</div>
          </Link>
        </div>
        <div className="profile">
          <div className="profile1">
            {["Profile Card", "Notifications", "Register"].map((section) => (
              <div
                key={section}
                className={`profile2 ${activeSection === section ? "active" : ""}`}
                onClick={() => handleSectionChange(section)}
              >
                {section}
              </div>
            ))}
          </div>
          <div className="profile3">
            <div className="heading">{cardTitle}</div>
            {renderActiveComponent()}
          </div>
        </div>
      </div>
      <Whatsapp />
    </div>
  );
}

export default Profile;