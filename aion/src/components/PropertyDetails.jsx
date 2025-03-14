import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import House from "../assets/house.png";
import Type from "../assets/type.png";
import Garages from "../assets/garage.png";
import Size from "../assets/size.png";
import Land from "../assets/land.png";
import Year from "../assets/year.png";
import { PropertyContext } from "../context/PropertyContext";
import { UserContext } from "../context/UserContext";
import config from "../.config";

function displayPropertyPhotos(property) {
  if (
    !property?.photos ||
    !Array.isArray(property.photos) ||
    property.photos.length === 0
  ) {
    return <p>No photos available for this property.</p>;
  }

  const photos = property.photos.map((p) => ({
    url: p.url,
    isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
  }));

  return (
    <div className="myPropertyImages">
      {photos.map((photo, index) => (
        <div key={index} className="myPropertyImages-1">
          <img
            src={photo.isFullUrl ? photo.url : `${config.apiUrl}${photo.url}`}
            alt={`Property Image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

function PropertyDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { properties, fetchProperties, loading, error } =
    useContext(PropertyContext);
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  const handleRentClick = () => {
    if (property) {
      navigate(`/rent`, { state: { property } });
    }
  };

  useEffect(() => {
    if (properties.length === 0 && !loading) {
      fetchProperties();
    }
  }, [properties, fetchProperties, loading]);

  useEffect(() => {
    if (properties.length > 0) {
      const foundProperty = properties.find((prop) => prop.id === parseInt(id));
      setProperty(foundProperty || null);
    }
  }, [id, properties]);

  if (loading) {
    return (
      <div className="loadingProperties">
        <span className="spinner"></span> Loading property details...
      </div>
    );
  }
  if (error) {
    return <div className="errorProperties">Error: {error}</div>;
  }

  if (properties.length === 0) {
    return <div>No properties available to display.</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  const {
    propertyName,
    propertyCategory,
    location,
    numberOfBedRooms,
    numberOfBathrooms,
    amenities,
    priceTag,
    description,
    garage,
    houseSize,
    landSize,
    yearBuilt,
  } = property;

  return (
    <div className="propertyDetails">
      <div>{displayPropertyPhotos(property)}</div>
      <div className="propertyInformation">
        <div className="propertyInformation-1">
          <div className="propertyName">
            <p>{property.propertyName}</p>
            <p className="statusCode">{property.statusCode}</p>
            <p className="pricetag">Ugshs. {priceTag}</p>
          </div>
        </div>
        <br />
        <div className="features">
          <h2>Features</h2>
          <div className="Bed">
            <div className="Bed-1">
              <img src={Bed} alt="Bed" />
              <p>{numberOfBedRooms}</p>
            </div>
            <div className="Bed-1">
              <img src={Bathroom} alt="Bathrooms" />
              <p>{numberOfBathrooms}</p>
            </div>
            <div className="Bed-1">
              <img src={House} alt="House" />
              <p>{property.id}</p>
            </div>
            <div className="Bed-1">
              <img src={Type} alt="Type" />
              <p>{propertyCategory}</p>
            </div>
            <div className="Bed-1">
              <img src={Garages} alt="Garage" />
              <p>{garage}</p>
            </div>
            <div className="Bed-1">
              <img src={Size} alt="Size" />
              <p>{houseSize} sq. ft.</p>
            </div>
            <div className="Bed-1">
              <img src={Land} alt="Land" />
              <p>{landSize} sq. ft.</p>
            </div>
            <div className="Bed-1">
              <img src={Year} alt="Year" />
              <p>{yearBuilt}</p>
            </div>
          </div>
          <div className="loco">
            <div className="Bed-1">
              <img src={LocationPng} alt="Location" />
              <p>{location}</p>
            </div>
          </div>
          <div className="amenities">
            <p>Amenities:</p>
            <div className="amenities1">
              <p>{amenities}</p>
            </div>
          </div>
          <div className="description">
            <p>Description</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
      <div className="aboutProperty">
        <div className="aboutProperty-1">Contact Agent</div>
        <div className="aboutProperty-1">Buy</div>
        <div className="aboutProperty-1" onClick={handleRentClick}>
          Rent
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
