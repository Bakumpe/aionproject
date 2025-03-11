import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import Amenities from "../assets/amenities1.png";
import config from "../.config";

function displayPropertyPhotos(property) {
  let photo = null;
  let isFullUrl = false;

  if (property.photo && property.photo.length > 0) {
    photo = property.photo[0].url;
    isFullUrl = photo.startsWith("https://res.cloudinary.com");
  } else if (property.photo && property.photo.length > 0) {
    photo = property.photo[0].url;
    isFullUrl = photo.startsWith("https://res.cloudinary.com");
  }

  if (photo) {
    return (
      <div className="propertyImages">
        {isFullUrl ? (
          <NavLink to={photo}>
            <img src={photo} alt="Property Image" />
          </NavLink>
        ) : (
          <img src={`${config.apiUrl}${photo}`} alt="Property Image" />
        )}
      </div>
    );
  } else {
    return <p>No photos available for this property.</p>;
  }
}

function MyPropertyCard({ property }) {
  const navigate = useNavigate();

  const handleRentClick = () => {
    navigate(`/rent`, { state: { property } });
  };

  return (
    <li key={property.id} className="listedItem">
      <div className="PropertyCategory">
        <p>{property.PropertyCategory}</p>
        <p>Ugshs. {property.PriceTag} </p>
      </div>
      <Link to={`/properties/${property.id}`}>
        {displayPropertyPhotos(property)}
      </Link>
      <Link to={`/properties/${property.id}`}>
        <div className="propertyName">
          <p>{property.PropertyName}</p>
          <p>{property.StatusCode}</p>
        </div>

        <div className="specs">
          <div className="location">
            <img src={LocationPng} alt="location" />
            <p>{property.Location}</p>
          </div>
          <div className="specifications">
            <div className="specifications-1">
              <img src={Bed} alt="Bed" />
              <p>{property.NumberOfBedRooms}</p>
            </div>
            <div className="specifications-1">
              <img src={Bathroom} alt="Bathroom" />
              <p>{property.NumberOfBathrooms}</p>
            </div>
          </div>
          <div className="amenities">
            <img src={Amenities} alt="Amenitites" />
            <p>{property.Amenities}</p>
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
