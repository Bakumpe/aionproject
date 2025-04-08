import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../.config";
import axios from "axios";

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
    numberOfRooms: 0,
    currentOfficeAddress: "",
    newOfficeAddress: "",
    storageLocation: "",
    storageItemsDescription: "",
    additionalDetails: "",
    movingDate: "",
  });
  const [errors, setErrors] = useState({});

  const movingTypeFields = {
    "National Moving": [
      {
        component: "input",
        label: "Country of Origin",
        name: "countryOfOrigin",
        type: "text",
      },
      {
        component: "input",
        label: "Destination Country",
        name: "destinationCountry",
        type: "text",
      },
      {
        component: "textarea",
        label: "Describe the items to be moved",
        name: "itemsDescription",
      },
    ],
    "Home Moving": [
      {
        component: "textarea",
        label: "Describe the items to be moved",
        name: "itemsDescription",
      },
      {
        component: "input",
        label: "Number of rooms",
        name: "numberOfRooms",
        type: "number",
      },
    ],
    "Office Moving": [
      {
        component: "input",
        label: "Current Office Address",
        name: "currentOfficeAddress",
        type: "text",
      },
      {
        component: "input",
        label: "New Office Address",
        name: "newOfficeAddress",
        type: "text",
      },
      {
        component: "textarea",
        label: "Describe the items to be moved",
        name: "itemsDescription",
      },
    ],
    "Storage Moving": [
      {
        component: "input",
        label: "Storage Location",
        name: "storageLocation",
        type: "text",
      },
      {
        component: "textarea",
        label: "Describe the items to be moved",
        name: "storageItemsDescription",
      },
    ],
    "Other": [
      {
        component: "textarea",
        label: "Additional details",
        name: "additionalDetails",
      },
    ],
  };

  const movingTypeMap = {
    "National Moving": "national",
    "Home Moving": "home",
    "Office Moving": "office",
    "Storage Moving": "storage",
    Other: "other",
  };

  const handleMovingTypeClick = (type) => {
    setFormTitle(type);
    setMovingType(type);
    setErrors((prev) => ({ ...prev, movingType: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.locationFrom)
      newErrors.locationFrom = "Location From is required";
    if (!formData.locationTo) newErrors.locationTo = "Location To is required";
    if (!formData.movingDate)
      newErrors.movingDate = "Please select a moving date";
    if (!movingType) newErrors.movingType = "Please select a moving type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const resetForm = () => {
    setFormData({
      locationFrom: "",
      locationTo: "",
      countryOfOrigin: "",
      destinationCountry: "",
      itemsDescription: "",
      numberOfRooms: 0,
      currentOfficeAddress: "",
      newOfficeAddress: "",
      storageLocation: "",
      storageItemsDescription: "",
      additionalDetails: "",
      movingDate: "",
    });
    setMovingType("");
    setFormTitle("Moving Details");
    setPet("");
    setPetName("");
    setErrors({});
  };

  const createClient = async () => {
    if (!token) throw new Error("Authentication required");
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/clients`,
        {
          data: {
            name: user.username,
            email: user.email,
            // phone: user.phone || "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data.id;
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message || "Failed to create client"
      );
    }
  };

  const createNotification = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/notifications`,
        {
          data: {
            title: `New Relocation Request from ${user.username}`,
            message: `A new relocation request has been submitted by ${user.username}. Moving from ${formData.locationFrom} to ${formData.locationTo} on ${formData.movingDate}.`,
            sender: user.username,
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
      return response.data.data.id;
    } catch (error) {
      throw new Error(
        error.response?.data?.error?.message || "Failed to create notification"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      toast.error("Please log in to submit a relocation request");
      navigate("/login");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const clientId = await createClient();
      const notificationId = await createNotification();

      const requestData = {
        data: {
          requestType: movingTypeMap[movingType] || movingType,
          locationFrom: formData.locationFrom,
          locationTo: formData.locationTo,
          movingDate: formData.movingDate,
          countryOfOrigin: formData.countryOfOrigin || "",
          destinationCountry: formData.destinationCountry || "",
          itemsDescription: formData.itemsDescription || "",
          numberOfRooms: parseInt(formData.numberOfRooms, 10) || 0,
          currentOfficeAddress: formData.currentOfficeAddress || "",
          newOfficeAddress: formData.newOfficeAddress || "",
          storageLocation: formData.storageLocation || "",
          storageItemsDescription: formData.storageItemsDescription || "",
          additionalDetails: formData.additionalDetails || "",
          hasPet: pet === "yes",
          petName: pet === "yes" ? petName : "",
          statusCode: "pending",
          client: clientId,
          notification: notificationId,
        },
      };

      // console.log("Submitting payload:", JSON.stringify(requestData, null, 2));

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
        toast.success("Request submitted successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Submission error:", error);
      console.error("Error response:", error.response?.data);
      toast.error(
        `Failed to submit request: ${
          error.response?.data?.error?.message || error.message
        }`
      );
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
                {[
                  "Move National",
                  "Move Home",
                  "Move Office",
                  "Move Store",
                  "Other",
                ].map((type) => (
                  <div
                    key={type}
                    className="moving2"
                    onClick={() => handleMovingTypeClick(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
              {movingType === "" && errors.movingType && (
                <span className="error">{errors.movingType}</span>
              )}
            </div>
            <div className="movingDetails">
              <div className="heading">{formTitle}</div>
              <form onSubmit={handleSubmit}>
                {user ? (
                  <>
                    <div>
                      <p>
                        Welcome, {user.username} ({user.email})
                      </p>
                    </div>
                    <div>
                      <label htmlFor="locationFrom">
                        Where are you moving from?
                      </label>
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
                      {errors.locationFrom && (
                        <span className="error">{errors.locationFrom}</span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="locationTo">
                        Where are you moving to?
                      </label>
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
                      {errors.locationTo && (
                        <span className="error">{errors.locationTo}</span>
                      )}
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
                      {errors.movingDate && (
                        <span className="error">{errors.movingDate}</span>
                      )}
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
                              className="textRelocation"
                              placeholder={field.label}
                            />
                          )}
                        </div>
                      ))}
                    <div className="selection">
                      <label htmlFor="pet-select">Do you have a pet?</label>
                      <select
                        id="pet-select"
                        className="textRelocation"
                        value={pet}
                        onChange={(e) => setPet(e.target.value)}
                      >
                        <option value="" disabled>
                          Select
                        </option>
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
                    <button
                      type="submit"
                      className="relocationButton"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </>
                ) : (
                  <p>
                    Please <Link to="/login">log in</Link> to submit a
                    relocation request.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Whatsapp />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </>
  );
}

export default Relocation;