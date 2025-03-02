import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../styles/profileCard.css";
import UpdateUser from "../components/UpdateUserData";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import { ProfileCard } from "../components/ProfileCard";

function Profile() {
  const [isUpdateVisible, setIsUpdateVisible] = useState(false); // State for showing UpdateUser
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const lastUpdate = localStorage.getItem("lastUpdate");
    if (lastUpdate) {
      const now = new Date();
      const lastUpdateDate = new Date(lastUpdate);
      const diffInMilliseconds = now - lastUpdateDate;
      const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
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

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <ProfileCard />
        </div>
        <div className="sideBar">
          <Footer />
        </div>
      </div>

      {/* <div className="myProfile">
        <div className="updateProfile" onClick={handleUpdateClick}>
          Update Profile
        </div>
        {isUpdateVisible && <UpdateUser />}{" "}
      </div> */}
      <Whatsapp />
    </>
  );
}

export default Profile;
