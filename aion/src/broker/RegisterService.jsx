import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import config from "../.config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterService() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  const initialServiceData = {
    businessName: "",
    contact: "",
    location: "",
    photos: [],
  };

  const [serviceData, setServiceData] = useState(initialServiceData);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
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

    setUploading(true);

    try {
      let uploadedPhotos = [];
      if (files.length > 0) {
        // Step 1: Upload files to Strapi
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

      // Step 3: Prepare service data for Strapi
      const servicePayload = {
        data: {
          ...serviceData,
          photos: uploadedPhotos, // Array of photo IDs (empty array if no files)
          publishedAt: new Date().toISOString(), // Required for immediate publishing
        },
      };

      // Step 4: Create service entry
      const serviceResponse = await axios.post(
        `${config.apiUrl}/api/events`,
        servicePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (serviceResponse.status === 200) {
        setMessage("Service registered successfully!");
        setServiceData(initialServiceData);
        setFiles([]);
        e.target.reset(); // Reset form
        // Optionally navigate back to OurServices
        setTimeout(() => navigate("/ourservices"), 2000);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      setMessage(
        "Error registering service: " +
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
            <p>Register Your Service</p>
          </div>

          <form className="registerForm" onSubmit={uploadAndSubmit}>
            <div className="inputSection">
              <label>Business Name:</label>
              <input
                type="text"
                name="businessName"
                value={serviceData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                value={serviceData.contact}
                onChange={handleChange}
                required
                placeholder="Phone number or email"
              />
            </div>

            <div className="inputSection">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={serviceData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Photos:</label>
              <input
                type="file"
                name="photos"
                onChange={handleFileChange}
                multiple
                accept="image/*,video/*,audio/*,.pdf"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="registerSubmitButton"
            >
              {uploading ? "Registering..." : "Register Service"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default RegisterService;