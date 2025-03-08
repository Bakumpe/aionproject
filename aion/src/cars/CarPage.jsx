import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import config from "../.config";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";

function displayCarPhotos(car) {
  const renderPhoto = (photo) => {
    const isFullUrl = photo.startsWith("https://res.cloudinary.com");
    return (
      <div className="myCarCarImage" key={photo}>
        {isFullUrl ? (
          <NavLink to={photo}>
            <img src={photo} alt="Car Image" />
          </NavLink>
        ) : (
          <img src={`${config.apiUrl}${photo}`} alt="Car Image" />
        )}
      </div>
    );
  };

  if (car.CarImage && car.CarImage.length > 0) {
    return car.CarImage.map((image) => renderPhoto(image.url));
  } else if (car.images && car.images.length > 0) {
    return car.images.map((image) => renderPhoto(image.url));
  } else {
    return <p>No photos available for this car.</p>;
  }
}

function CarPage() {
  const { id } = useParams();
  const { cars, fetchCars } = useContext(CarContext);
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    if (cars.length > 0) {
      const selectedCar = cars.find((c) => c.id === parseInt(id));
      console.log(selectedCar); // Debugging - Check selected car data
      setCar(selectedCar);
    }
  }, [cars, id]);

  if (!car) {
    return <p>Loading car details...</p>;
  }

  return (
    <div>
      <div className="indexPage">
        <div className="navBar">
          {" "}
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Find Your Car That Meet</p>
          </div>
          <div className="carCard">
            <h2>{car.name}</h2>
            <div className="displayCarPhotos">
              {displayCarPhotos(car)}
            </div>

            <div className="carSpecificationCar">
              <div className="carSpecificationCar-1">
                This <em>{car.TypeofCar}</em> is a remarkable vehicle that
                stands out for its exceptional <em>{car.FuelEfficiency}</em>
                fuel efficiency and impressive <em>{car.horsepower}</em>
                horsepower, ensuring a powerful yet economical drive. With a top
                speed of <em>{car.speed}</em>, it offers thrilling performance
                on the road. The <em>{car.Transmission}</em> transmission
                guarantees a smooth and responsive driving experience. Safety is
                a top priority, and this car is equipped with advanced
                <em>{car.SafetyFeatures}</em>. Additionally, the ample
                <em>{car.CargoSpace}</em> cargo space provides practicality for
                all your storage needs. Whether you’re commuting daily or
                embarking on long trips, this car promises a reliable and
                enjoyable ride.
              </div>

              <div className="carSpecificationCar-1">
                This <em>{car.TypeofCar}</em> not only excels in performance but
                also offers exceptional
                <em>{car.InteriorAndComfort}</em> a good interior and comfort, ensuring a comfortable and
                enjoyable ride. Known for its
                <em>{car.ReliabilityAndMaintenance}</em> reliability and maintenance, it promises durability
                and low maintenance costs, making it a reliable choice. With a
                high <em>{car.ResaleValue}</em>, it retains value over time,
                providing a great return on investment. The car also comes with
                a comprehensive <em>{car.WarrantyAndAfterSalesService}</em> year warranty,
                offering peace of mind and excellent support after purchase. All
                these features are available within a budget of Ugshx.{" "}
                <em>{car.Budget}</em>, making it a well-rounded and practical
                option for any discerning driver.
              </div>

              <div>
                <h4>Reach Out For more information</h4>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="sideBar">
          {" "}
          <Footer />
        </div> */}
      </div>
      <Whatsapp />
    </div>
  );
}

export default CarPage;
