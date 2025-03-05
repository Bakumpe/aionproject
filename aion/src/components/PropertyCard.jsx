import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import Amenities from "../assets/amenities1.png";
import config from "../.config";

function displayPropertyPhotos(property) {
  if (property.PhotoUrl && property.PhotoUrl.length > 0) {
    const url = property.PhotoUrl[0]; // Display only the first photo
    return (
      <div className="myImages">
        <img src={`${config.apiUrl}${url}`} alt="Property Image" />
      </div>
    );
  } else if (property.photo && property.photo.length > 0) {
    const photo = property.photo[0]; // Display only the first photo
    return (
      <div className="myImages">
        <img src={`${config.apiUrl}${photo.url}`} alt="Property Image" />
      </div>
    );
  } else {
    return <p>No photos available for this property.</p>;
  }
}

function MyPropertyCard({ property }) {
  return (
    <Link to={`/properties/${property.id}`}>
      <li key={property.id}>
        <div className="PropertyCategory">
          <p>{property.PropertyCategory}</p>
        </div>
        <Link to={`/properties/${property.id}`}>
          {displayPropertyPhotos(property)}
        </Link>

        <p className="propertyName">{property.PropertyName}</p>

        <div className="specs">
          <div className="location">
            <img src={LocationPng} alt="location" />
            <p>{property.Location}</p>
          </div>
          <div className="specifications">
            <div className="specifications-1">
              <img src={Bed} alt="Bed" />
              {property.NumberOfBedRooms}
            </div>
            <div className="specifications-1">
              <img src={Bathroom} alt="Bathroom" />
              {property.NumberOfBathrooms}
            </div>
          </div>
          <div className="amenities">
            <img src={Amenities} alt="Amenitites" />
            {property.Amenities}
          </div>
        </div>

        <div className="priceTag">
          <p>Ugshs. {property.PriceTag} </p>
        </div>
      </li>
    </Link>
  );
}

export default MyPropertyCard;
