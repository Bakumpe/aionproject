import React, { useState, useRef, useContext } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../.config";
import axios from "axios";

function Relocation() {
  // Accessing user and token from UserContext for authentication
  const { user, token } = useContext(UserContext);
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // State management for form title, moving type, pet details, submission status, form data, files, and errors
  const [formTitle, setFormTitle] = useState("Moving Details"); // Tracks the title displayed in the form
  const [movingType, setMovingType] = useState(""); // Tracks selected moving type (e.g., "Home Moving")
  const [pet, setPet] = useState(""); // Tracks if user has a pet ("yes" or "no")
  const [petName, setPetName] = useState(""); // Tracks pet's name if applicable
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks form submission status
  const [formData, setFormData] = useState({
    // Initial form data object with all fields empty
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
  });
  const [files, setFiles] = useState([]); // Stores uploaded files (e.g., images, PDFs)
  const [errors, setErrors] = useState({}); // Tracks validation errors
  const fileInputRef = useRef(null); // Reference to file input for resetting

  // Defines fields to display based on moving type
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

  // Maps moving types to API-compatible values
  const movingTypeMap = {
    "National Moving": "national",
    "Home Moving": "home",
    "Office Moving": "office",
    "Storage Moving": "storage",
    "Other": "other",
  };

  // Handles clicking a moving type, updates form title and clears related error
  const handleMovingTypeClick = (type) => {
    setFormTitle(type); // Sets form title to selected type
    setMovingType(type); // Sets the moving type
    setErrors((prev) => ({ ...prev, movingType: null })); // Clears moving type error
  };

  // Validates required fields before submission
  const validateForm = () => {
    const newErrors = {};
    if (!formData.locationFrom) newErrors.locationFrom = "Location From is required";
    if (!formData.locationTo) newErrors.locationTo = "Location To is required";
    if (!formData.movingDate) newErrors.movingDate = "Please select a moving date";
    if (!movingType) newErrors.movingType = "Please select a moving type";
    setErrors(newErrors); // Updates error state
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Updates form data and clears errors for changed fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Updates form data
    setErrors((prev) => ({ ...prev, [name]: null })); // Clears error for this field
  };

  // Handles file input changes
  const handleFileChange = (e) => {
    setFiles(e.target.files); // Stores selected files
  };

  // Resets the form to initial state
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
    });
    setFiles([]); // Clears uploaded files
    setMovingType(""); // Resets moving type
    setFormTitle("Moving Details"); // Resets form title
    setPet(""); // Resets pet selection
    setPetName(""); // Resets pet name
    setErrors({}); // Clears all errors
    if (fileInputRef.current) fileInputRef.current.value = ""; // Resets file input
  };

  // Creates a client record in the backend
  const createClient = async () => {
    if (!token) throw new Error("Authentication required");
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/clients`,
        {
          data: {
            name: user.username,
            email: user.email,
            phone: user.phone || "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data.id; // Returns client ID
    } catch (error) {
      throw new Error(error.response?.data?.error?.message || "Failed to create client");
    }
  };

  // Creates a notification for the relocation request
  const createNotification = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/notifications`,
        {
          data: {
            message: "You have a new Request for relocation",
            isRead: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data.id; // Returns notification ID
    } catch (error) {
      throw new Error(error.response?.data?.error?.message || "Failed to create notification");
    }
  };

  // Uploads files to the backend and returns file IDs
  const uploadFiles = async () => {
    if (files.length === 0) return []; // No files to upload
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file); // Adds each file to FormData
    });

    const uploadResponse = await axios.post(`${config.apiUrl}/api/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return uploadResponse.data.map((file) => file.id); // Returns array of file IDs
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Checks if user is authenticated
    if (!user || !token) {
      toast.error("Please log in to submit a relocation request");
      navigate("/login"); // Redirects to login page
      return;
    }

    if (!validateForm()) return; // Stops if validation fails

    setIsSubmitting(true); // Disables submit button during submission

    try {
      const clientId = await createClient(); // Creates client record
      const uploadedFileIds = await uploadFiles(); // Uploads files
      const notificationId = await createNotification(); // Creates notification

      // Prepares request data for submission
      const requestData = {
        data: {
          requestType: movingTypeMap[movingType] || movingType,
          locationFrom: formData.locationFrom,
          locationTo: formData.locationTo,
          movingDate: formData.movingDate,
          countryOfOrigin: formData.countryOfOrigin || "",
          destinationCountry: formData.destinationCountry || "",
          itemsDescription: formData.itemsDescription || "",
          numberOfRooms: parseInt(formData.numberOfRooms, 10) || "",
          currentOfficeAddress: formData.currentOfficeAddress || "",
          newOfficeAddress: formData.newOfficeAddress || "",
          storageLocation: formData.storageLocation || "",
          storageItemsDescription: formData.storageItemsDescription || "",
          additionalDetails: formData.additionalDetails || "",
          hasPet: pet === "yes",
          petName: pet === "yes" ? petName : "",
          statusCode: "pending",
          photos: uploadedFileIds,
          client: clientId,
          notifications: notificationId,
        },
      };

      console.log("Submitting payload:", JSON.stringify(requestData, null, 2)); // Logs request data for debugging

      // Submits the relocation request
      const response = await axios.post(
        `${config.apiUrl}/api/requests`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Request submitted successfully!"); // Shows success message
        resetForm(); // Resets form on success
      }
    } catch (error) {
      console.error("Submission error:", error); // Logs error details
      console.error("Error response:", error.response?.data);
      toast.error(`Failed to submit request: ${error.response?.data?.error?.message || error.message}`); // Shows error message
    } finally {
      setIsSubmitting(false); // Re-enables submit button
    }
  };

  // Renders the component UI
  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header /> {/* Renders navigation header */}
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>Relocate With Ease</p>
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div> {/* Link to property search */}
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
                {/* Renders moving type options */}
                {["National Moving", "Home Moving", "Office Moving", "Storage Moving", "Other"].map(
                  (type) => (
                    <div
                      key={type}
                      className="moving2"
                      onClick={() => handleMovingTypeClick(type)} // Sets moving type on click
                    >
                      {type}
                    </div>
                  )
                )}
              </div>
              {movingType === "" && errors.movingType && (
                <span className="error">{errors.movingType}</span> // Shows error if no type selected
              )}
            </div>
            <div className="movingDetails">
              <div className="heading">{formTitle}</div> {/* Displays dynamic form title */}
              <form onSubmit={handleSubmit}>
                {user ? (
                  <>
                    <div>
                      <p>Welcome, {user.username} ({user.email})</p> {/* Welcomes logged-in user */}
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
                        min={new Date().toISOString().split("T")[0]} // Ensures future dates only
                        required
                      />
                      {errors.movingDate && <span className="error">{errors.movingDate}</span>}
                    </div>
                    {/* Renders additional fields based on moving type */}
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
                        onChange={(e) => setPet(e.target.value)} // Updates pet selection
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
                          onChange={(e) => setPetName(e.target.value)} // Updates pet name
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
                        onChange={handleFileChange} // Handles file selection
                        className="fileInput"
                        ref={fileInputRef}
                      />
                    </div>
                    <button
                      type="submit"
                      className="relocationButton"
                      disabled={isSubmitting} // Disables button during submission
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </>
                ) : (
                  <p>Please <Link to="/login">log in</Link> to submit a relocation request.</p> // Prompts login if not authenticated
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Whatsapp /> {/* Renders WhatsApp component */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} /> {/* Renders toast notifications */}
    </>
  );
}

export default Relocation;