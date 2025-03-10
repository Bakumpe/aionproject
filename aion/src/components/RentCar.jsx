import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import config from "../.config";

function displayCarPhotos(car) {
  let photos = [];

  if (car.CarImage && car.CarImage.length > 0) {
    photos = car.CarImage.map((p) => ({
      url: p.url,
      isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
    }));
  } else if (car.images && car.images.length > 0) {
    photos = car.images.map((p) => ({
      url: p.url,
      isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
    }));
  }

  return photos.length > 0 ? (
    <div className="myCarRentImages">
      {photos.map((photo, index) => (
        <div key={index} className="myCarRentImages-1">
          {photo.isFullUrl ? (
            <a href={photo.url} target="_blank" rel="noopener noreferrer">
              <img src={photo.url} alt={`Car Image ${index + 1}`} />
            </a>
          ) : (
            <img
              src={`${config.apiUrl}${photo.url}`}
              alt={`Car Image ${index + 1}`}
            />
          )}
        </div>
      ))}
    </div>
  ) : (
    <p>No photos available for this car.</p>
  );
}

function RentCar() {
  const location = useLocation();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    if (location.state && location.state.car) {
      setCarDetails(location.state.car);
    }
  }, [location.state]);

  if (!carDetails) {
    return <p>Loading car details...</p>;
  }

  return (
    <>
      <div className="rentCar">
        <div className="displayCarPhotos">{displayCarPhotos(carDetails)}</div>
        <div className="rentCarDetails">
          <div className="specs">
            <div className="specs-1">
              <p>Type of Car:</p>
              <p className="specs-1-1">{carDetails.TypeofCar}</p>
            </div>
            <div className="specs-1">
              <p>Transmission:</p>
              <p className="specs-1-1">{carDetails.Transmission}</p>
            </div>
            <div className="specs-1">
              <p>Fuel Type:</p>
              <p className="specs-1-1">{carDetails.FuelType}</p>
            </div>
            <div className="specs-1">
              <p>Horsepower:</p>
              <p className="specs-1-1">{carDetails.horsepower} hp</p>
            </div>
            <div className="specs-1">
              <p>Fuel Efficiency:</p>
              <p className="specs-1-1">{carDetails.FuelEfficiency} km/L</p>
            </div>
          </div>
          <div className="carOwnerDetails">
            <h2>Owner Details</h2>
            <p>Name: {carDetails.CarOwner}</p>
            <p>Contact: {carDetails?.contact}</p>
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

export default RentCar;
