import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import config from "../.config";

// function displayCarPhotos(car) {
//   // console.log(car.CarImage); // Debugging - Check CarImage data

//   if (car.CarImage && car.CarImage.length > 0) {
//     const photo = car.CarImage[0].url; // Ensure you have the correct path
//     // console.log(`${config.apiUrl}${url}`); // Debugging - Check constructed URL
//     return (
//       <div className="myCarImage">
//         <img src={`${config.apiUrl}${photo}`} alt="Car Image" />
//       </div>
//     );
//   } else if (car.images && car.images.length > 0) {
//     const photo = car.images[0].url; // Display only the first image
//     return (
//       <div className="myCarImage">
//         <img src={`${config.apiUrl}${photo}`} alt="Car Image" />
//       </div>
//     );
//   } else {
//     return <p>No photos available for this car.</p>;
//   }
// }

// function displayCarPhotos(car) {
//   if (car.CarImage && car.CarImage.length > 0) {
//     const photo = car.CarImage[0].url;
//     return (
//       <div className="myCarImage">
//         <NavLink to={photo}>
//           <img src={photo} alt="Car Image" />
//         </NavLink>
//       </div>
//     );
//   } else if (car.images && car.images.length > 0) {
//     const photo = car.images[0].url;
//     return (
//       <div className="myCarImage">
//         <NavLink to={photo}>
//           <img src={photo} alt="Car Image" />
//         </NavLink>
//       </div>
//     );
//   } else {
//     return <p>No photos available for this car.</p>;
//   }
// }

function displayCarPhotos(car) {
  let photo = null;
  let isFullUrl = false;

  if (car.CarImage && car.CarImage.length > 0) {
    photo = car.CarImage[0].url;
    isFullUrl = photo.startsWith("https://res.cloudinary.com");
  } else if (car.images && car.images.length > 0) {
    photo = car.images[0].url;
    isFullUrl = photo.startsWith("https://res.cloudinary.com");
  }

  if (photo) {
    return (
      <div className="myCarImage">
        {isFullUrl ? (
          <NavLink to={photo}>
            <img src={photo} alt="Car Image" />
          </NavLink>
        ) : (
          <img src={`${config.apiUrl}${photo}`} alt="Car Image" />
        )}
      </div>
    );
  } else {
    return <p>No photos available for this car.</p>;
  }
}

function CarCard({ car }) {
  const navigate = useNavigate();

  const handleRentClick = () => {
    navigate(`/rentcar`, { state: { car } });
  };
  return (
    <li key={car.id} className="carListCar">
      <Link to={`/cars/${car.id}`}>{displayCarPhotos(car)}</Link>

      <div className="carSpecifications">
        <p>
          <strong>Type of Car:</strong> {car.TypeofCar}
        </p>
        <p>
          <strong>Transmission:</strong> {car.Transmission}
        </p>
        <p>
          <strong>Fuel Type:</strong> {car.FuelType}
        </p>
        <p>
          <strong>Horsepower:</strong> {car.horsepower} hp
        </p>
        <p>
          <strong>Fuel Efficiency:</strong> {car.FuelEfficiency} km/L
        </p>
        <div className="buyRentOptions">
          <div className="buyRentOptions-1" onClick={handleRentClick}>
            Rent
          </div>
          <div className="buyRentOptions-1">Buy</div>
        </div>
      </div>
    </li>
  );
}

export default CarCard;
