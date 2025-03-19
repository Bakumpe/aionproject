import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import Amenities from "../assets/amenities1.png";
import config from "../.config";

function displayPropertyPhotos(property) {
  // console.log("Property passed to displayPropertyPhotos:", property);

  if (!property?.photos || !Array.isArray(property.photos) || property.photos.length === 0) {
    // console.log("No valid photos array found:", property?.photos);
    return <p>No photos available for this property.</p>;
  }

  const firstPhoto = property.photos[0]?.url;
  // console.log("First photo URL:", firstPhoto);

  if (!firstPhoto) {
    // console.log("First photo URL is missing or invalid");
    return <p>No photos available for this property.</p>;
  }

  const isFullUrl = firstPhoto.startsWith("https://res.cloudinary.com");

  return (
    <div className="propertyImages">
      {isFullUrl ? (
        <NavLink to={firstPhoto}>
          <img src={firstPhoto} alt="Property Image" />
        </NavLink>
      ) : (
        <img src={`${config.apiUrl}${firstPhoto}`} alt="Property Image" />
      )}
    </div>
  );
}

function MyPropertyCard({ property }) {
  const navigate = useNavigate();

  const handleRentClick = () => {
    navigate(`/properties/${property.id}`, { state: { property } });
  };

  return (
    <li key={property.id} className="listedItem">
      <div className="PropertyCategory">
        <p>{property.propertyCategory}</p>
        <p className="pricetag">Ugshs. {property.priceTag} </p>
      </div>
      <Link to={`/properties/${property.id}`}>
        {displayPropertyPhotos(property)}
      </Link>
      <Link to={`/properties/${property.id}`}>
        <div className="propertyName">
          <p>{property.propertyName}</p>
          <p className="statusCode">{property.statusCode}</p>
        </div>

        <div className="specs">
          <div className="location">
            <img src={LocationPng} alt="location" />
            <p>{property.location}</p>
          </div>
          <div className="specifications">
            <div className="specifications-1">
              <img src={Bed} alt="Bed" />
              <p>{property.numberOfBedRooms}</p>
            </div>
            <div className="specifications-1">
              <img src={Bathroom} alt="Bathroom" />
              <p>{property.numberOfBathrooms}</p>
            </div>
          </div>
          <div className="amenities">
            <img src={Amenities} alt="Amenitites" />
            <p>{property.amenities}</p>
          </div>
        </div>
      </Link>
      <div className="buyRentOptions">
        <div className="buyRentOptions-1" onClick={handleRentClick}>
          Rent
        </div>
        <div className="buyRentOptions-1">Buy</div>
      </div>
    </li>
  );
}

export default MyPropertyCard;
