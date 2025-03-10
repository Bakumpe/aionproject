import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import Amenities from "../assets/amenities1.png";
import config from "../.config";

function displayPropertyPhotos(property) {
  let photos = [];

  if (property.photo && property.photo.length > 0) {
    photos = property.photo.map((p) => ({
      url: p.url,
      isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
    }));
  }

  return photos.length > 0 ? (
    <div className="myPropertyImages">
      {photos.map((photo, index) => (
        <div key={index} className="myPropertyImages-1">
          {photo.isFullUrl ? (
            <NavLink to={photo.url}>
              <img src={photo.url} alt={`Property Image ${index + 1}`} />
            </NavLink>
          ) : (
            <img
              src={`${config.apiUrl}${photo.url}`}
              alt={`Property Image ${index + 1}`}
            />
          )}
        </div>
      ))}
    </div>
  ) : (
    <p>No photos available for this property.</p>
  );
}

function Rent() {
  const location = useLocation();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);

  useEffect(() => {
    if (location.state && location.state.property) {
      setPropertyDetails(location.state.property);

      // Mock owner details, replace with real data fetching logic
      const owner = {
        name: location.state.property.PropertyOwner || 'Unknown Owner',
        contact: "",
      };
      setOwnerDetails(owner);
    }
  }, [location.state]);

  if (!propertyDetails) {
    return <p>Loading property details...</p>;
  }

  return (
    <>
      <div className="rent">
        {displayPropertyPhotos(propertyDetails)}
        <div className="rent-1">
          <div className="specs">
            <div>
              <div className="specs-1">
                <p>Property Category:</p>
                <p className="specs-1-1">{propertyDetails.PropertyCategory}</p>
              </div>
              <div className="specs-1">
                <p>Property Name:</p>
                <p className="specs-1-1">{propertyDetails.PropertyName}</p>
              </div>
            </div>
            <div className="location">
              <img src={LocationPng} alt="location" />
              <p>{propertyDetails.Location}</p>
            </div>
            <div className="specifications">
              <div className="specifications-1">
                <img src={Bed} alt="Bed" />
                <p>{propertyDetails.NumberOfBedRooms}</p>
              </div>
              <div className="specifications-1">
                <img src={Bathroom} alt="Bathroom" />
                <p>{propertyDetails.NumberOfBathrooms}</p>
              </div>
            </div>
            <div className="amenities">
              <img src={Amenities} alt="Amenities" />
              <p>{propertyDetails.Amenities}</p>
            </div>
          </div>
          <div className="ownerDetails">
            <h2>Owner Details</h2>
            <p>Name: {propertyDetails.PropertyOwner}</p>
            <p>Contact: {ownerDetails?.contact}</p>
          </div>
        </div>

        <h2>Terms and Conditions</h2>
        <p>Terms and conditions...</p>
        <h2>Agreement</h2>
        <p>Agreement...</p>
      </div>
    </>
  );
}

export default Rent;
