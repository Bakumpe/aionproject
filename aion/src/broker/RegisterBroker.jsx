import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import useFetchProperties from "../hooks/fetchData";
import config from "../.config";
import TermsAndConditions from "./TermsAndConditions";
import Modal from "react-modal"; // Import the Modal component
import axios from "axios";

Modal.setAppElement("#root"); // Add this to avoid screen readers focusing on elements outside the modal

function RegisterBroker({ setIsRegisteredBroker }) {
  const { user } = useContext(UserContext);
  const [brokerFormData, setBrokerFormData] = useState({
    UserId: user?.id || "",
    Country: "",
    District: "",
    County: "",
    Subcounty: "",
    Zone: "",
    Village: "",
    NextOfKin: "",
    NextOfKinContact: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrokerFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions before registering.");
      return;
    }
    console.log("BrokerFormData being sent:", brokerFormData); // Log the payload
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/brockers`, //Change the spelling to brokers from backend
        { data: brokerFormData }, // Wrap the payload in a "data" key
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Broker Registered: ", response.data);
      setIsRegisteredBroker(true);
    } catch (error) {
      console.error("Error registering broker: ", error);
      alert(`Error registering broker: ${error.message}`);
    }
  };

  return (
    <>
      <form class="register-form">
        <h1>Register As Broker To Proceed</h1>
        <div className="myInputs">
          <div>
            <label className="myInputs-1">
              Country:
              <input
                type="text"
                name="Country"
                value={brokerFormData.Country}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="myInputs-1">
              District:
              <input
                type="text"
                name="District"
                value={brokerFormData.District}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="myInputs-1">
              County:
              <input
                type="text"
                name="County"
                value={brokerFormData.County}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="myInputs-1">
              Subcounty:
              <input
                type="text"
                name="Subcounty"
                value={brokerFormData.Subcounty}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="myInputs-1">
              Zone:
              <input
                type="text"
                name="Zone"
                value={brokerFormData.Zone}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="myInputs-1">
              Village:
              <input
                type="text"
                name="Village"
                value={brokerFormData.Village}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="myInputs-1">
              Next Of Kin:
              <input
                type="text"
                name="NextOfKin"
                value={brokerFormData.NextOfKin}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="myInputs-1">
              Next Of Kin Contact:
              <input
                type="number"
                name="NextOfKinContact"
                value={brokerFormData.NextOfKinContact}
                onChange={handleChange}
              />
            </label>
          </div>

          <div class="terms-section">
            <label onClick={() => setModalIsOpen(true)} class="terms-link">
              Terms and Conditions
            </label>
            <label>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              I agree to the terms and conditions
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRegister}
          className="register-button"
        >
          Register
        </button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Terms and Conditions"
        className="terms-modal"
        overlayClassName="terms-overlay"
      >
        <button onClick={() => setModalIsOpen(false)}>Close</button>
        <TermsAndConditions />
      </Modal>
    </>
  );
}

export default RegisterBroker;
