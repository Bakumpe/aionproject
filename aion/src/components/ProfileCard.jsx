import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/profileCard.css";
import { useNavigate } from "react-router-dom";
// import UpLoadAvatar from "./UpLoadAvatar"; 
// import config from "../.config";
import Aion from "../assets/apartment.jpg"

export const ProfileCard = () => {
  const { user } = useContext(UserContext); // Access the token from the context
  const navigate = useNavigate();
  // const [avatarUrl, setAvatarUrl] = useState(user ? user.avatarUrl : ""); 
  const [isUploadVisible, setIsUploadVisible] = useState(false); // State for showing UpLoadAvatar

  if (!user) {
    console.log("No user data available, redirecting to login."); // Log the redirection reason
    navigate("/profile"); // Redirect to login if no user data is available
    return null;
  }

  // const handleAvatarClick = () => {
  //   setIsUploadVisible(!isUploadVisible);
  // };

  return (
    <div className="upc">
      <div className="gradient">
        <img src={Aion} alt="Logo" />
      </div>
      {/* <div className="profileDown">
        <div className="avatarsImage" onClick={handleAvatarClick}>
          <img
            src={`${config.apiUrl}${avatarUrl}`}
            alt="Avatar"
          />
        </div>
      </div> */}

      <div className="profileDetails">
        <div className="name">
          <p>First Name:</p>
          <p>
            <em>{user.firstName}</em>
          </p>
        </div>
        <div className="name">
          <p>Sirname:</p>
          <p>
            <em>{user.sirName}</em>
          </p>
        </div>
        <div className="name">
          <p>Last Name:</p>
          <p>
            <em>{user.lastName}</em>
          </p>
        </div>
        <div className="name">
          <p>Date of Birth:</p>
          <p>
            <em>{user.dateOfBirth}</em>
          </p>
        </div>
        <div className="name">
          <p>Phone Number:</p>
          <p>
            <em>{user.phoneNumber}</em>
          </p>
        </div>
        <div className="name">
          <p>Address:</p>
          <p>
            <em>{user.address}</em>
          </p>
        </div>
        <div className="name">
          <p>Occupation:</p>
          <p>
            <em>{user.occupation}</em>
          </p>
        </div>
      </div>
      {/* {isUploadVisible && (
        <UpLoadAvatar setAvatarUrl={setAvatarUrl} /> 
      )} */}
    </div>
  );
};
