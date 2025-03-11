import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import config from "../.config";
import axios from "axios";

function RegisterProperty() {
  const { user, token } = useContext(UserContext);
  const [propertyData, setPropertyData] = useState({
    PropertyName: "",
    PropertyCategory: "",
    NumberOfBedRooms: 0,
    PriceTag: 0,
    NumberOfUnitsForNeighbors: 0,
    Amenities: "",
    Location: "",
    NumberOfBathrooms: 0,
    Description: "",
    Garage: 0,
    HouseSize: 0,
    LandSize: 0,
    YearBuilt: "",
    PhotoUrl: [], // Ensure PhotoUrl is an array to hold multiple URLs
    PropertyOwner: "",
    StatusCode: "For Rent",
  });

  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const uploadAndSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("ref", "user"); // The name of the content type
    formData.append("refId", user.id); // The ID of the user
    formData.append("field", "photos");
  
    try {
      // Upload files to server
      const uploadResponse = await axios.post(
        `${config.apiUrl}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const uploadedFiles = uploadResponse.data;
      const photoUrls = uploadedFiles.map((file) => file.url); // Extract the URLs of the uploaded files
  
      // Prepare property data with photo URLs
      const data = {
        ...propertyData,
        PhotoUrl: photoUrls,
      };
  
      if (!token) {
        setMessage("Failed to obtain token");
        return;
      }
  
      // Post property data
      const response = await fetch(`${config.apiUrl}/api/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the Bearer token here
        },
        body: JSON.stringify({ data }), // Wrap the data object in a "data" property
      });
  
      if (response.ok) {
        const result = await response.json();
        setMessage("Data posted successfully: " + JSON.stringify(result));
      } else {
        const errorResult = await response.json(); // Parse the error response
        setMessage(`Failed to post data: ${response.statusText} - ${errorResult.message}`);
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
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

          <form className="registerForm" onSubmit={uploadAndSubmit}>
            <div>
              <label>Type:</label>
              <select
                name="StatusCode"
                value={propertyData.StatusCode}
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
                value={propertyData.PropertyName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Property Category:</label>
              <select
                name="PropertyCategory"
                value={propertyData.PropertyCategory}
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
                value={propertyData.NumberOfBedRooms}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Price Tag:</label>
              <input
                type="number"
                name="PriceTag"
                value={propertyData.PriceTag}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Number of Units for Neighbors:</label>
              <input
                type="number"
                name="NumberOfUnitsForNeighbors"
                value={propertyData.NumberOfUnitsForNeighbors}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Amenities:</label>
              <input
                type="text"
                name="Amenities"
                value={propertyData.Amenities}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Location:</label>
              <input
                type="text"
                name="Location"
                value={propertyData.Location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Number of Bathrooms:</label>
              <input
                type="number"
                name="NumberOfBathrooms"
                value={propertyData.NumberOfBathrooms}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                name="Description"
                value={propertyData.Description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Garage:</label>
              <input
                type="number"
                name="Garage"
                value={propertyData.Garage}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>House Size:</label>
              <input
                type="number"
                name="HouseSize"
                value={propertyData.HouseSize}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Land Size:</label>
              <input
                type="number"
                name="LandSize"
                value={propertyData.LandSize}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Year Built:</label>
              <input
                type="text"
                name="YearBuilt"
                value={propertyData.YearBuilt}
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
                value={propertyData.PropertyOwner}
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
