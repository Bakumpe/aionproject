import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "../styles/registerProperty.css";
import config from "../.config";

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
  });
  const [message, setMessage] = useState([]);
  const [file, setFile] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files);
  };

  const uploadAndSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }
    formData.append("ref", "user"); // The name of the content type
    formData.append("refId", user.id); // The ID of the user
    formData.append("field", "photos"); // The name of the field in the content type

    try {
      // Upload files
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

      const data = {
        PropertyUniqueIdentifier: propertyData.PropertyUniqueIdentifier,
        PropertyName: propertyData.PropertyName,
        PropertyCategory: propertyData.PropertyCategory,
        NumberOfBedRooms: propertyData.NumberOfBedRooms,
        PriceTag: propertyData.PriceTag,
        NumberOfUnitsForNeighbors: propertyData.NumberOfUnitsForNeighbors,
        Amenities: propertyData.Amenities,
        Location: propertyData.Location,
        NumberOfBathrooms: propertyData.NumberOfBathrooms,
        Description: propertyData.Description,
        Garage: propertyData.Garage,
        HouseSize: propertyData.HouseSize,
        LandSize: propertyData.LandSize,
        YearBuilt: propertyData.YearBuilt,
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
        setMessage(["Data posted successfully: " + JSON.stringify(result)]);
      } else {
        const errorResult = await response.json(); // Parse the error response
        setMessage([
          `Failed to post data: ${response.statusText} - ${errorResult.message}`,
        ]);
      }
    } catch (error) {
      setMessage(["An error occurred: " + error.message]);
    }
  };

  return (
    <>
      <div>
        <div className="blockerProfile">
          <form onSubmit={uploadAndSubmit} className="blockerForm">
            <p className="blockerTitle">Register Property</p>
            <div className="myInputs">
              <div className="myInput">
                <label htmlFor="PropertyName">Property Name:</label>
                <input
                  type="text"
                  id="PropertyName"
                  name="PropertyName"
                  value={propertyData.PropertyName}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="PropertyCategory">Property Category:</label>
                <select
                  id="PropertyCategory"
                  name="PropertyCategory"
                  value={propertyData.PropertyCategory}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
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

              <div className="myInput">
                <label htmlFor="NumberOfBedRooms">Bed Rooms:</label>
                <input
                  type="number"
                  id="NumberOfBedRooms"
                  name="NumberOfBedRooms"
                  value={propertyData.NumberOfBedRooms}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="PriceTag">Price:</label>
                <input
                  type="number"
                  id="PriceTag"
                  name="PriceTag"
                  value={propertyData.PriceTag}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="NumberOfUnitsForNeighbors">Neighbors:</label>
                <input
                  type="number"
                  id="NumberOfUnitsForNeighbors"
                  name="NumberOfUnitsForNeighbors"
                  value={propertyData.NumberOfUnitsForNeighbors}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="Amenities">Amenities:</label>
                <input
                  type="text"
                  id="Amenities"
                  name="Amenities"
                  value={propertyData.Amenities}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="Location">Location:</label>
                <input
                  type="text"
                  id="Location"
                  name="Location"
                  value={propertyData.Location}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="NumberOfBathrooms">Bathrooms:</label>
                <input
                  type="number"
                  id="NumberOfBathrooms"
                  name="NumberOfBathrooms"
                  value={propertyData.NumberOfBathrooms}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="Description">Description:</label>
                <input
                  type="text"
                  id="Description"
                  name="Description"
                  value={propertyData.Description}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="Garage">Garage:</label>
                <input
                  type="number"
                  id="Garage"
                  name="Garage"
                  value={propertyData.Garage}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="HouseSize">House Size:</label>
                <input
                  type="number"
                  id="HouseSize"
                  name="HouseSize"
                  value={propertyData.HouseSize}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="LandSize">Land Size:</label>
                <input
                  type="number"
                  id="LandSize"
                  name="LandSize"
                  value={propertyData.LandSize}
                  onChange={handleChange}
                />
              </div>
              <div className="myInput">
                <label htmlFor="YearBuilt">Year Built:</label>
                <input
                  type="date"
                  id="YearBuilt"
                  name="YearBuilt"
                  value={propertyData.YearBuilt}
                  onChange={handleChange}
                />
              </div>

              <div className="handlefiles ">
              <p>Choose not more than 3 Property Photos</p>
              <input type="file" multiple onChange={handleFileChange} />
            </div>
            </div>

            <div className="Button">
              <button type="submit">Submit</button>
            </div>
          </form>

          {message && <p className="errorMessage">{message.join("\n")}</p>}
        </div>
      </div>
    </>
  );
}

export default RegisterProperty;
