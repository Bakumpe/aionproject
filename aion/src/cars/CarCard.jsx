import React from "react";
import { Link } from "react-router-dom";
import config from "../.config";
import "./car.css";

function displayCarPhotos(car) {
  console.log(car.CarImage); // Debugging - Check CarImage data

  if (car.CarImage && car.CarImage.length > 0) {
    const url = car.CarImage[0].url; // Ensure you have the correct path
    console.log(`${config.apiUrl}${url}`); // Debugging - Check constructed URL

    return (
      <div className="myCarImage">
        <img src={`${config.apiUrl}${url}`} alt="Car Image" />
      </div>
    );
  } else if (car.images && car.images.length > 0) {
    const photo = car.images[0]; // Display only the first image
    return (
      <div className="myCarImage">
        <img src={`${config.apiUrl}${photo}`} alt="Car Image" />
      </div>
    );
  } else {
    return <p>No photos available for this car.</p>;
  }
}

// function displayCarPhotos(car) {
//   console.log(car.CarImage); // Debugging - Check CarImage data

//   if (car.CarImage && car.CarImage.length > 0) {
//     return (
//       <div className="myCarImage">
//         {car.CarImage.map((image, index) => (
//           <img
//             key={index}
//             src={`${config.apiUrl}${image.url}`} // Ensure you have the correct path
//             alt="Car Image"
//           />
//         ))}
//       </div>
//     );
//   } else if (car.images && car.images.length > 0) {
//     return (
//       <div className="myCarImage">
//         {car.images.map((photo, index) => (
//           <img
//             key={index}
//             src={`${config.apiUrl}${photo}`} // Ensure you have the correct path
//             alt="Car Image"
//           />
//         ))}
//       </div>
//     );
//   } else {
//     return <p>No photos available for this car.</p>;
//   }
// }

function CarCard({ car }) {
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
      </div>
    </li>
  );
}

export default CarCard;
