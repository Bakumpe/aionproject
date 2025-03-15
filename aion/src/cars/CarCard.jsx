import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import config from "../.config";

function displayCarPhotos(car) {
  const photo = car.photos?.[0]?.url || null; // Removed car.images fallback if not needed
  const isFullUrl = photo?.startsWith("https://res.cloudinary.com");

  if (!photo) {
    return <p>No photos available for this car.</p>;
  }

  return (
    <div className="myCarImage">
      {isFullUrl ? (
        <NavLink to={photo}>
          <img src={photo} alt={`${car.name || "Unknown"} Car`} />
        </NavLink>
      ) : (
        <img
          src={`${config.apiUrl}${photo}`}
          alt={`${car.name || "Unknown"} Car`}
        />
      )}
    </div>
  );
}

function CarCard({ car }) {
  const navigate = useNavigate();

  const handleRentClick = () => {
    navigate(`/cars/${car.id}`, { state: { car } });
  };

  const handleBuyClick = () => {
    navigate(`/cars/${car.id}`, { state: { car } });
  };

  return (
    <li key={car.id} className="carListCar">
      <div>
        <div className="budget">
         <p>Ugshs. {car.budget ?? "N/A"}</p>  {/* Added label */}
        </div>
        <Link to={`/cars/${car.id}`}>{displayCarPhotos(car)}</Link>
      </div>

      <div className="propertyName">
        <p>{car.name || "Unnamed Car"}</p>
        <p className="statusCode">{car.statusCode || "N/A"}</p>
      </div>
      <div className="carSpecifications">
        <p>
          Type of Car: <strong>{car.typeofCar || "Unknown"}</strong>
        </p>
        <p>
          Transmission: <strong>{car.transmission || "N/A"}</strong>
        </p>
        <p>
          Fuel Type: <strong>{car.fuelType || "N/A"}</strong>
        </p>
        <p>
          Horsepower: <strong>{car.horsepower ?? "N/A"} hp</strong>
        </p>
        <p>
          Fuel Efficiency: <strong>{car.fuelEfficiency ?? "N/A"} km/L</strong>
        </p>
        {/* Optional: Add more fields from RegisterCar if desired */}
        <p>
          Top Speed: <strong>{car.speed ?? "N/A"} km/hr</strong>
        </p>
        <div className="buyRentOptions">
          <div
            className="buyRentOptions-1"
            onClick={handleRentClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && handleRentClick()}
          >
            Rent
          </div>
          <div
            className="buyRentOptions-1"
            onClick={handleBuyClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && handleBuyClick()}
          >
            Buy
          </div>
        </div>
      </div>
    </li>
  );
}

export default CarCard;
