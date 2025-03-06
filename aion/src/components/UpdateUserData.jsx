import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import config from "../.config"

function UpdateUser() {
  const { user, setUser, token } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    sirName: user.sirName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
    address: user.address,
    occupation: user.occupation,
  });
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) {
      alert("You can only update your profile once a month.");
      return;
    }

    try {
      const response = await axios.put(
        `${config.apiUrl}/api/users/${user.id}`,
        {
          email: formData.email,
          username: formData.username,
          firstName: formData.firstName,
          sirName: formData.sirName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          occupation: formData.occupation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response:", response);
      setUser(response.data);
      localStorage.setItem("lastUpdate", new Date());
      setIsDisabled(true);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating user data", error);
      alert("Error updating user data.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="updateUserForm">
        <div className="heading">
          <h3>Update User Data</h3>
        </div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>

        <label>
          Sir Name:
          <input
            type="text"
            name="sirName"
            value={formData.sirName}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>

        <label>
          Date Of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>

        <label>
          Occupation:
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </label>
        <button type="submit" disabled={isDisabled}>Update</button>
      </form>
    </>
  );
}

export default UpdateUser;
