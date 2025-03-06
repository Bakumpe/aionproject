import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


function ProfileCard(){
  const { user } = useContext(UserContext); // Access the token from the context
  const navigate = useNavigate();
  // const [avatarUrl, setAvatarUrl] = useState(user ? user.avatarUrl : ""); 
  const [isUploadVisible, setIsUploadVisible] = useState(false); // State for showing UpLoadAvatar

  if (!user) {
    console.log("No user data available, redirecting to login."); // Log the redirection reason
    navigate("/profile"); // Redirect to login if no user data is available
    return null;
  }

  return (
    <div className="upc">
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
export default ProfileCard;
