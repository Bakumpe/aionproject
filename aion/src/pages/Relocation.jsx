import React, { useState, useRef, useContext } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../.config";

function Relocation() {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("Moving Details");
  const [movingType, setMovingType] = useState("");
  const [pet, setPet] = useState("");
  const [petName, setPetName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    locationFrom: "",
    locationTo: "",
    countryOfOrigin: "",
    destinationCountry: "",
    itemsDescription: "",
    numberOfRooms: "",
    currentOfficeAddress: "",
    newOfficeAddress: "",
    storageLocation: "",
    storageItemsDescription: "",
    additionalDetails: "",
    movingDate: "",
    files: [],
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const movingTypeFields = {
    "National Moving": [
      { component: "input", label: "Country of Origin", name: "countryOfOrigin", type: "text" },
      { component: "input", label: "Destination Country", name: "destinationCountry", type: "text" },
      { component: "textarea", label: "Describe the items to be moved", name: "itemsDescription" },
    ],
    "Home Moving": [
      { component: "textarea", label: "Describe the items to be moved", name: "itemsDescription" },
      { component: "input", label: "Number of rooms", name: "numberOfRooms", type: "number" },
    ],
    "Office Moving": [
      { component: "input", label: "Current Office Address", name: "currentOfficeAddress", type: "text" },
      { component: "input", label: "New Office Address", name: "newOfficeAddress", type: "text" },
      { component: "textarea", label: "Describe the items to be moved", name: "itemsDescription" },
    ],
    "Storage Moving": [
      { component: "input", label: "Storage Location", name: "storageLocation", type: "text" },
      { component: "textarea", label: "Describe the items to be moved", name: "storageItemsDescription" },
    ],
    "Other": [
      { component: "textarea", label: "Additional details", name: "additionalDetails" },
    ],
  };

  const handleMovingTypeClick = (type) => {
    setFormTitle(type);
    setMovingType(type);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.locationFrom) newErrors.locationFrom = "Location From is required";
    if (!formData.locationTo) newErrors.locationTo = "Location To is required";
    if (!formData.movingDate) newErrors.movingDate = "Please select a moving date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      setFormData((prev) => ({ ...prev, files: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const resetForm = () => {
    setFormData({
      locationFrom: "",
      locationTo: "",
      countryOfOrigin: "",
      destinationCountry: "",
      itemsDescription: "",
      numberOfRooms: "",
      currentOfficeAddress: "",
      newOfficeAddress: "",
      storageLocation: "",
      storageItemsDescription: "",
      additionalDetails: "",
      movingDate: "",
      files: [],
    });
    setMovingType("");
    setFormTitle("Moving Details");
    setPet("");
    setPetName("");
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const createClient = async () => {
    if (!token) throw new Error("Authentication required");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const clientResponse = await fetch(`${config.apiUrl}/api/relocation-clients`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          data: {
            name: user.username,
            email: user.email,
            phone: user.phone || "",
          },
        }),
      });
      const clientData = await clientResponse.json();

      if (!clientResponse.ok) {
        console.error("Error creating client:", clientResponse.status, clientData);
        throw new Error(`Failed to create client: ${clientData.error?.message || clientResponse.statusText}`);
      }

      return clientData.data.id;
    } catch (error) {
      console.error("Detailed error in createClient:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User:", user, "Token:", token);

    if (!user || !token) {
      toast.error("Please log in to submit a relocation request");
      navigate("/login");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const clientId = await createClient();

      const requestData = {
        request_type: movingType,
        location_from: formData.locationFrom,
        location_to: formData.locationTo,
        moving_date: formData.movingDate,
        ...(movingType === "National Moving" && {
          country_origin: formData.countryOfOrigin,
          destination_country: formData.destinationCountry,
          items_description: formData.itemsDescription,
        }),
        ...(movingType === "Home Moving" && {
          items_description: formData.itemsDescription,
          number_of_rooms: parseInt(formData.numberOfRooms, 10) || undefined,
        }),
        ...(movingType === "Office Moving" && {
          current_office_address: formData.currentOfficeAddress,
          new_office_address: formData.newOfficeAddress,
          items_description: formData.itemsDescription,
        }),
        ...(movingType === "Storage Moving" && {
          storage_location: formData.storageLocation,
          storage_items_description: formData.storageItemsDescription,
        }),
        ...(movingType === "Other" && {
          additional_details: formData.additionalDetails,
        }),
        has_pet: pet === "yes",
        ...(pet === "yes" && { pet_name: petName }),
        client: clientId,
        status: "pending",
      };

      let response;
      let responseData;

      if (formData.files.length === 0) {
        // No files: Use JSON
        console.log("Sending JSON request:", { data: requestData });
        response = await fetch(`${config.apiUrl}/api/relocation-requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: requestData }),
        });
        responseData = await response.json();
        if (!response.ok) {
          console.error("JSON Response error data:", responseData);
          throw new Error(responseData.error?.message || "Submission failed");
        }
      } else {
        // With files: Use FormData
        const submissionData = new FormData();
        submissionData.append("data", JSON.stringify(requestData));
        formData.files.forEach((file, index) => {
          submissionData.append("files", file); // Adjust 'files' to match your Strapi media field name if different
        });

        // Detailed FormData logging
        console.log("FormData contents:");
        for (let [key, value] of submissionData.entries()) {
          console.log(`${key}: ${value instanceof File ? `[File: ${value.name}]` : value}`);
        }

        response = await fetch(`${config.apiUrl}/api/relocation-requests`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: submissionData,
        });
        responseData = await response.json();
        if (!response.ok) {
          console.error("FormData Response error data:", responseData);
          throw new Error(responseData.error?.message || "Submission failed");
        }
      }

      resetForm();
      toast.success("Request submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(`Failed to submit request: ${error.message}`);
    } finally {
      setIsSubmitting(false);
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
            <p>Relocate With Ease</p>
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
          </div>
          <div className="move">
            <div className="moveSmarter">
              <div className="moveSmarter-1">
                <p>Move with AionMov</p>
                <div className="contactUs">Contact Us</div>
              </div>
            </div>
            <div className="moving">
              <div className="moving1">
                {["National Moving", "Home Moving", "Office Moving", "Storage Moving", "Other"].map(
                  (type) => (
                    <div
                      key={type}
                      className="moving2"
                      onClick={() => handleMovingTypeClick(type)}
                    >
                      {type}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="movingDetails">
              <div className="heading">{formTitle}</div>
              <form onSubmit={handleSubmit}>
                {user ? (
                  <>
                    <div>
                      <p>Welcome, {user.username} ({user.email})</p>
                    </div>
                    <div>
                      <label htmlFor="locationFrom">Where are you moving from?</label>
                      <input
                        id="locationFrom"
                        name="locationFrom"
                        type="text"
                        value={formData.locationFrom}
                        onChange={handleInputChange}
                        className="textRelocation"
                        placeholder="Location From"
                        required
                      />
                      {errors.locationFrom && <span className="error">{errors.locationFrom}</span>}
                    </div>
                    <div>
                      <label htmlFor="locationTo">Where are you moving to?</label>
                      <input
                        id="locationTo"
                        name="locationTo"
                        type="text"
                        value={formData.locationTo}
                        onChange={handleInputChange}
                        className="textRelocation"
                        placeholder="Location To"
                        required
                      />
                      {errors.locationTo && <span className="error">{errors.locationTo}</span>}
                    </div>
                    <div>
                      <label htmlFor="movingDate">Preferred Moving Date</label>
                      <input
                        id="movingDate"
                        name="movingDate"
                        type="date"
                        value={formData.movingDate}
                        onChange={handleInputChange}
                        className="textRelocation"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                      {errors.movingDate && <span className="error">{errors.movingDate}</span>}
                    </div>
                    {movingType &&
                      movingTypeFields[movingType]?.map((field) => (
                        <div key={field.name}>
                          <label htmlFor={field.name}>{field.label}</label>
                          {field.component === "input" ? (
                            <input
                              id={field.name}
                              name={field.name}
                              type={field.type || "text"}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              className="textRelocation"
                              placeholder={field.label}
                            />
                          ) : (
                            <textarea
                              id={field.name}
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              className="textarea"
                              placeholder={field.label}
                            />
                          )}
                        </div>
                      ))}
                    <div className="selection">
                      <label htmlFor="pet-select">Do you have a pet?</label>
                      <select
                        id="pet-select"
                        className="custom-select"
                        value={pet}
                        onChange={(e) => setPet(e.target.value)}
                      >
                        <option value="" disabled>Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {pet === "yes" && (
                      <div>
                        <label htmlFor="petName">Pet's Name</label>
                        <input
                          id="petName"
                          name="petName"
                          type="text"
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          className="textRelocation"
                          placeholder="Enter your pet's name"
                        />
                      </div>
                    )}
                    <div>
                      <label htmlFor="files">Upload Inventory List or Photos</label>
                      <input
                        id="files"
                        name="files"
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleInputChange}
                        className="fileInput"
                        ref={fileInputRef}
                      />
                    </div>
                    <button
                      type="submit"
                      className="relocationButton"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </>
                ) : (
                  <p>Please <Link to="/login">log in</Link> to submit a relocation request.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Whatsapp />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
}

export default Relocation;