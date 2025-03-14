import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import config from "../.config";

function displayPropertyPhotos(event) {
  console.log("Property passed to displayPropertyPhotos:", event);

  if (
    !event?.photos ||
    !Array.isArray(event.photos) ||
    event.photos.length === 0
  ) {
    console.log("No valid photos array found:", event?.photos);
    return <p>No photos available for this property.</p>;
  }

  const firstPhoto = event.photos[0]?.url;
  console.log("First photo URL:", firstPhoto);

  if (!firstPhoto) {
    console.log("First photo URL is missing or invalid");
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

function MyServiceCard({ event }) {
  const navigate = useNavigate();

  const handleRentClick = () => {
    navigate(`/properties/${event.id}`, { state: { event } });
  };

  return (
    <li key={event.id} className="listedItem">
      <Link to={`/events/${event.id}`}>{displayPropertyPhotos(event)}</Link>
      <p>{event.businessName}</p>
      <p>{event.contact}</p>
      <p>{event.location}</p>
    </li>
  );
}

export default MyServiceCard;
