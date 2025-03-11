import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import config from "../.config";

function RegisterProperty() {
  const { user, token } = useContext(UserContext);
  const location = useLocation();
  const initialType = location.state?.type || "For Rent"; // Default to "For Rent" if type is not provided

  const [formData, setFormData] = useState({
    PropertyName: "",
    PropertyCategory: "",
    NumberOfBedRooms: 0,
    PriceTag: 0,
    NumberOfUnitsForNeighbors: 0,
    Amenities: "",
    photo: null,
    Location: "",
    NumberOfBathrooms: 0,
    Description: "",
    Garage: "",
    HouseSize: 0,
    LandSize: 0,
    YearBuilt: "",
    PhotoUrl: [],
    PropertyOwner: "",
    StatusCode: initialType,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, PhotoUrl: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (key === "PhotoUrl") {
        for (const file of formData.PhotoUrl) {
          form.append("files.PhotoUrl", file);
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    console.log("User Token:", token); // Log the token for debugging

    try {
      const api = `${config.apiUrl}/api/properties`;
      const response = await fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`, // Pass authentication token
        },
        body: form,
      });

      if (response.ok) {
        console.log("Property registered successfully");
      } else {
        console.log("Failed to register property");
      }
    } catch (error) {
      console.error("Error:", error);
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
            <p>Register Property</p>
          </div>

          <form className="registerForm" onSubmit={handleSubmit}>
            <div>
              <label>Type:</label>
              <select
                name="StatusCode"
                value={formData.StatusCode}
                onChange={handleChange}
              >
                <option value="For Rent">For Rent</option>
                <option value="For Sale">For Sale</option>
              </select>
            </div>

            <div>
              <label>Property Name:</label>
              <input
                type="text"
                name="PropertyName"
                value={formData.PropertyName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Property Category:</label>
              <select
                name="PropertyCategory"
                value={formData.PropertyCategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Apartment">Apartment</option>
                <option value="Stand Alone">Stand Alone</option>
                <option value="Villa">Villa</option>
                <option value="Studio House">Studio House</option>
                <option value="Arcade Small Room">Arcade Small Room</option>
                <option value="ECEG">ECEG</option>
                <option value="Flat Building">Flat Building</option>
                <option value="Rental Space">Rental Space</option>
              </select>
            </div>

            <div>
              <label>Number of Bedrooms:</label>
              <input
                type="number"
                name="NumberOfBedRooms"
                value={formData.NumberOfBedRooms}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Price Tag:</label>
              <input
                type="number"
                name="PriceTag"
                value={formData.PriceTag}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Number of Units for Neighbors:</label>
              <input
                type="number"
                name="NumberOfUnitsForNeighbors"
                value={formData.NumberOfUnitsForNeighbors}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Amenities:</label>
              <input
                type="text"
                name="Amenities"
                value={formData.Amenities}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Location:</label>
              <input
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Number of Bathrooms:</label>
              <input
                type="number"
                name="NumberOfBathrooms"
                value={formData.NumberOfBathrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Garage:</label>
              <input
                type="text"
                name="Garage"
                value={formData.Garage}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>House Size:</label>
              <input
                type="number"
                name="HouseSize"
                value={formData.HouseSize}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Land Size:</label>
              <input
                type="number"
                name="LandSize"
                value={formData.LandSize}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Year Built:</label>
              <input
                type="text"
                name="YearBuilt"
                value={formData.YearBuilt}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Photo:</label>
              <input
                type="file"
                name="PhotoUrl"
                onChange={handleFileChange}
                required
                multiple
              />
            </div>

            <div>
              <label>Property Owner:</label>
              <input
                type="text"
                name="PropertyOwner"
                value={formData.PropertyOwner}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Register Property</button>
          </form>
        </div>
      </div>

      <Whatsapp />
    </>
  );
}

export default RegisterProperty;
