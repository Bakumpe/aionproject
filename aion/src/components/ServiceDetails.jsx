import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import LocationPng from "../assets/location.png";
import config from "../.config";
import { UserContext } from "../context/UserContext";
import { ServiceContext } from "../context/ServiceContext";

function displayServicePhotos(service) {
  if (
    !service?.photos ||
    !Array.isArray(service.photos) ||
    service.photos.length === 0
  ) {
    return <p>No photos available for this service.</p>;
  }

  const photos = service.photos.map((p) => ({
    url: p.url,
    isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
  }));

  return (
    <div className="myPropertyImages">
      {photos.map((photo, index) => (
        <div key={index} className="myPropertyImages-1">
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
  const { services, fetchServices, loading, error } = useContext(ServiceContext); // Changed 'event' to 'services'
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (services.length === 0 && !loading) {
      fetchServices();
    }
  }, [services, fetchServices, loading]);

  useEffect(() => {
    if (services.length > 0) {
      const foundService = services.find((serv) => serv.id === parseInt(id));
      setService(foundService || null);
    }
  }, [id, services]);

  const { businessName, contact, location, description } = service || {};

  function handleBooking() {
    if (service && user) {
      navigate("/booking", { state: { service, user } });
    } else if (!user) {
      navigate("/login", { state: { from: `/service/${id}` } });
    } else {
      console.error("No service available for booking");
    }
  }

  function handleContactClick() {
    if (service) {
      navigate("/contact", { state: { service } });
    }
  }

  return (
    <div className="propertyDetails">
      {loading ? (
        <div className="loadingProperties">
          <span className="spinner"></span>
          <span>Loading service details...</span>
        </div>
      ) : error ? (
        <div className="errorServices">Error: {error}</div>
      ) : services.length === 0 ? (  // Changed 'service' to 'services'
        <div>No services available to display.</div>
      ) : !service ? (
        <div>Service not found.</div>
      ) : (
        <>
          <div>{displayServicePhotos(service)}</div>
          <div className="propertyInformation">
            <div className="propertyInformation-1">
              <div className="propertyName">
                <p>{businessName}</p>
                <p className="contact">{contact}</p>
              </div>
            </div>
            <br />
            <div className="features">
              <div className="features-1">
                <h2>Service Details</h2>
                {/* Add more service-specific fields here if needed */}
              </div>
              <div className="Bed">
                <div className="Bed-1"> {/* Reusing Bed-1 class for consistency */}
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
            <div className="aboutProperty">
              <div 
                className="aboutProperty-1" 
                onClick={handleContactClick}
              >
                Contact Provider
              </div>
              <div
                className="aboutProperty-1"
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