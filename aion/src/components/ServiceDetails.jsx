import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import LocationPng from "../assets/location.png";
import config from "../.config";
import { UserContext } from "../context/UserContext"; // Assuming you have this
import { ServiceContext } from "../context/ServiceContext"; // You'll need to create this

function displayServicePhotos(event) {
  if (
    !event?.photos ||
    !Array.isArray(event.photos) ||
    event.photos.length === 0
  ) {
    return <p>No photos available for this service.</p>;
  }

  const photos = event.photos.map((p) => ({
    url: p.url,
    isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
  }));

  return (
    <div className="myServiceImages">
      {photos.map((photo, index) => (
        <div key={index} className="myServiceImages-1">
          <img
            src={photo.isFullUrl ? photo.url : `${config.apiUrl}${photo.url}`}
            alt={`Service Image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

function ServiceDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { event, fetchServices, loading, error } = useContext(ServiceContext); // You'll need to create this context
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  const handleContactClick = () => {
    if (event) {
      navigate(`/contact`, { state: { service } });
    }
  };

  useEffect(() => {
    if (event.length === 0 && !loading) {
      fetchServices();
    }
  }, [event, fetchServices, loading]);

  useEffect(() => {
    if (event.length > 0) {
      const foundService = event.find((serv) => serv.id === parseInt(id));
      setService(foundService || null);
    }
  }, [id, event]);

  const { businessName, contact, location, description } = service || {};

  function handleBooking() {
    if (event && user) {
      navigate("/booking", { state: { event, user } });
    } else if (!user) {
      navigate("/login", { state: { from: `/events/${id}` } });
    } else {
      console.error("No service available for booking");
    }
  }

  return (
    <div className="serviceDetails">
      {loading ? (
        <div className="loadingServices">
          <span className="spinner"></span>
          <span>Loading service details...</span>
        </div>
      ) : error ? (
        <div className="errorServices">Error: {error}</div>
      ) : services.length === 0 ? (
        <div>No services available to display.</div>
      ) : !service ? (
        <div>Service not found.</div>
      ) : (
        <>
          <div>{displayServicePhotos(service)}</div>
          <div className="serviceInformation">
            <div className="serviceInformation-1">
              <div className="serviceName">
                <p>{businessName}</p>
                <p className="contact">{contact}</p>
              </div>
            </div>
            <br />
            <div className="features">
              <h2>Service Details</h2>
              <div className="loco">
                <div className="serviceDetail-1">
                  <img src={LocationPng} alt="Location" />
                  <p>{location || "N/A"}</p>
                </div>
              </div>
              <div className="description">
                <p>Description</p>
                <p>{description || "No description available"}</p>
              </div>
            </div>
          </div>
          
          <div className="termsAndConditions">
            <h2>Terms and Conditions</h2>
            <ul>
              <li>Implement Terms and Condition Logic here</li>
            </ul>
          </div>

          <div className="agreement">
            <h2>Booking Agreement</h2>
            <p>By proceeding to book, you agree to the following:</p>
            <ul>
              <li>Implement Booking Agreement here</li>
            </ul>
          </div>

          <div className="checkout">
            <div className="aboutService">
              <div className="aboutService-1" onClick={handleContactClick}>
                Contact Provider
              </div>
              <div
                className="aboutService-1"
                onClick={handleBooking}
                disabled={!user}
              >
                Book Service
              </div>
            </div>
            {!user && (
              <p className="loginPrompt">
                Please <NavLink to="/login">log in</NavLink> to proceed with
                booking.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ServiceDetails;