import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import config from "../.config";
import axios from "axios";

function RegisterProperty() {
  const { user, token } = useContext(UserContext);

  const initialPropertyData = {
    propertyName: "",
    propertyCategory: "",
    numberOfBedRooms: 0,
    priceTag: "0", // Changed to string to match biginteger
    numberOfUnitsForNeighbors: 0,
    amenities: "",
    location: "",
    numberOfBathrooms: 0,
    description: "",
    garage: 0,
    houseSize: 0,
    landSize: "0", // Changed to string to match biginteger
    yearBuilt: "",
    photos: [],
    propertyOwner: "",
    statusCode: "for-rent",
  };

  const [propertyData, setPropertyData] = useState(initialPropertyData);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

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

    if (!token) {
      setMessage("Authentication token is missing");
      return;
    }

    // Photos are not required in the Strapi model, so we can proceed even if files.length === 0

    setUploading(true);

    try {
      let uploadedPhotos = [];
      if (files.length > 0) {
        // Step 1: Upload files to Strapi (which uses Cloudinary)
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });

        const uploadResponse = await axios.post(
          `${config.apiUrl}/api/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Step 2: Get the uploaded file IDs
        uploadedPhotos = uploadResponse.data.map((file) => file.id);
      }

      // Step 3: Prepare property data for Strapi
      const propertyPayload = {
        data: {
          ...propertyData,
          photos: uploadedPhotos, // Array of photo IDs (empty array if no files)
          priceTag: propertyData.priceTag.toString(), // Ensure biginteger is sent as string
          landSize: propertyData.landSize.toString(), // Ensure biginteger is sent as string
          publishedAt: new Date().toISOString(), // Required for immediate publishing since draftAndPublish is true
        },
      };

      // Step 4: Create property entry
      const propertyResponse = await axios.post(
        `${config.apiUrl}/api/properties`,
        propertyPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (propertyResponse.status === 200) {
        setMessage("Property registered successfully!");
        setPropertyData(initialPropertyData);
        setFiles([]);
        e.target.reset(); // Reset form
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      setMessage(
        "Error registering property: " +
          (error.response?.data?.error?.message || error.message)
      );
    } finally {
      setUploading(false);
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
            <p>Register Your Property</p>
          </div>

          <form className="registerForm" onSubmit={uploadAndSubmit}>
            <div className="inputSection">
              <label>Type:</label>
              <select
                name="statusCode"
                value={propertyData.statusCode}
                onChange={handleChange}
              >
                <option value="for-rent">For Rent</option>
                <option value="for-sale">For Sale</option>
              </select>
            </div>

            <div className="inputSection">
              <label>Property Name:</label>
              <input
                type="text"
                name="propertyName"
                value={propertyData.propertyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Property Category:</label>
              <select
                name="propertyCategory"
                value={propertyData.propertyCategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="apartment">Apartment</option>
                <option value="stand-alone">Stand Alone</option>
                <option value="villa">Villa</option>
                <option value="studio-house">Studio House</option>
                <option value="eceg">ECEG</option>
                <option value="flat-building">Flat Building</option>
                <option value="business-space">Business Space</option>
              </select>
            </div>

            <div className="inputSection">
              <label>Number of Bedrooms:</label>
              <input
                type="number"
                name="numberOfBedRooms"
                value={propertyData.numberOfBedRooms}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Price Tag:</label>
              <input
                type="number"
                name="priceTag"
                value={propertyData.priceTag}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Number of Units for Neighbors:</label>
              <input
                type="number"
                name="numberOfUnitsForNeighbors"
                value={propertyData.numberOfUnitsForNeighbors}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Number of Bathrooms:</label>
              <input
                type="number"
                name="numberOfBathrooms"
                value={propertyData.numberOfBathrooms}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={propertyData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Amenities:</label>
              <textarea
                name="amenities"
                value={propertyData.amenities}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Description:</label>
              <textarea
                name="description"
                value={propertyData.description}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Garage:</label>
              <input
                type="number"
                name="garage"
                value={propertyData.garage}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>House Size (sqft):</label>
              <input
                type="number"
                name="houseSize"
                value={propertyData.houseSize}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Land Size (sqft):</label>
              <input
                type="number"
                name="landSize"
                value={propertyData.landSize}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Year Built:</label>
              <input
                type="date"
                name="yearBuilt"
                value={propertyData.yearBuilt}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Property Owner:</label>
              <input
                type="text"
                name="propertyOwner"
                value={propertyData.propertyOwner}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Photos:</label>
              <input
                type="file"
                name="photos"
                onChange={handleFileChange}
                multiple
                accept="image/*,video/*,audio/*,.pdf" // Matches allowedTypes in Strapi model
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="registerSubmitButton"
            >
              {uploading ? "Registering..." : "Register Property"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default RegisterProperty;
