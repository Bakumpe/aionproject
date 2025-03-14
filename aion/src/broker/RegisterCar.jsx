import React, { useContext, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { UserContext } from "../context/UserContext";
import config from "../.config";
import axios from "axios";

function RegisterCar() {
  const { user, token } = useContext(UserContext);

  const initialCarData = {
    name: "",
    typeofCar: "",
    transmission: "",
    fuelType: "",
    horsepower: 0,
    fuelEfficiency: 0, // Number type
    speed: 0, // Number type
    safetyFeatures: "",
    cargoSpace: "",
    interiorAndComfort: "",
    reliabilityAndMaintenance: "",
    resaleValue: 0, // Number type
    warrantyAndAfterSalesService: "",
    budget: 0, // Number type
    statusCode: "for-rent",
    photos: [],
  };

  const [carData, setCarData] = useState(initialCarData);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
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

        uploadedPhotos = uploadResponse.data.map((file) => file.id);
      }

      const carPayload = {
        data: {
          ...carData,
          photos: uploadedPhotos,
          publishedAt: new Date().toISOString(),
        },
      };

      const carResponse = await axios.post(
        `${config.apiUrl}/api/cars`,
        carPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (carResponse.status === 200) {
        setMessage("Car registered successfully!");
        setCarData(initialCarData);
        setFiles([]);
        e.target.reset();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      setMessage(
        "Error registering car: " +
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
            <p>Register Your Car</p>
          </div>

          <form className="registerForm" onSubmit={uploadAndSubmit}>
            <div className="inputSection">
              <label>Type:</label>
              <select
                name="statusCode"
                value={carData.statusCode}
                onChange={handleChange}
              >
                <option value="for-rent">For Rent</option>
                <option value="for-sale">For Sale</option>
              </select>
            </div>

            <div className="inputSection">
              <label>Car Name:</label>
              <input
                type="text"
                name="name"
                value={carData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Type of Car:</label>
              <select
                name="typeofCar"
                value={carData.typeofCar}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Van">Van</option>
              </select>
            </div>

            <div className="inputSection">
              <label>Transmission:</label>
              <select
                name="transmission"
                value={carData.transmission}
                onChange={handleChange}
                required
              >
                <option value="">Select Transmission</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div className="inputSection">
              <label>Fuel Type:</label>
              <select
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="inputSection">
              <label>Horsepower:</label>
              <input
                type="number"
                name="horsepower"
                value={carData.horsepower}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Fuel Efficiency (km/L):</label>
              <input
                type="number"
                name="fuelEfficiency"
                value={carData.fuelEfficiency}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputSection">
              <label>Top Speed (km/hr):</label>
              <input
                type="number"
                name="speed"
                value={carData.speed}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Safety Features:</label>
              <textarea
                name="safetyFeatures"
                value={carData.safetyFeatures}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Cargo Space:</label>
              <input
                type="text"
                name="cargoSpace"
                value={carData.cargoSpace}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Interior and Comfort:</label>
              <textarea
                name="interiorAndComfort"
                value={carData.interiorAndComfort}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Reliability and Maintenance:</label>
              <textarea
                name="reliabilityAndMaintenance"
                value={carData.reliabilityAndMaintenance}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Resale Value (%):</label>
              <input
                type="number"
                name="resaleValue"
                value={carData.resaleValue}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Warranty and After-Sales Service:</label>
              <input
                type="text"
                name="warrantyAndAfterSalesService"
                value={carData.warrantyAndAfterSalesService}
                onChange={handleChange}
              />
            </div>

            <div className="inputSection">
              <label>Price Tag:</label>
              <input
                type="number"
                name="budget"
                value={carData.budget}
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
              {uploading ? "Registering..." : "Register Car"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default RegisterCar;