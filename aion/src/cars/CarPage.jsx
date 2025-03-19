import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import config from "../.config";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";

function displayCarPhotos(car) {
  const renderPhoto = (photos, index) => {
    const photo = photos?.url;
    if (!photo) return null;
    const isFullUrl = photo.startsWith("https://res.cloudinary.com");
    return (
      <div className="myCarCarImage" key={`${car.id}-${index}`}>
        {isFullUrl ? (
          <NavLink to={photo}>
            <img src={photo} alt={`${car.name || "Car"} Image`} />
          </NavLink>
        ) : (
          <img
            src={`${config.apiUrl}${photo}`}
            alt={`${car.name || "Car"} Image`}
          />
        )}
      </div>
    );
  };

  const photos = car.photos || car.images || [];
  if (!photos.length) {
    return <p>No photos available for this car.</p>;
  }

  return photos.map((image, index) => renderPhoto(image, index));
}

function CarPage() {
  const { id } = useParams();
  const { cars, fetchCars } = useContext(CarContext);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cars.length) {
      setLoading(true);
      fetchCars().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchCars, cars.length]);

  useEffect(() => {
    if (cars.length > 0) {
      const selectedCar = cars.find((c) => c.id === parseInt(id, 10));
      // console.log(selectedCar); // Debugging
      setCar(selectedCar || null);
    }
  }, [cars, id]);

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (!car) {
    return <p>Car not found.</p>;
  }

  const specSections = [
    {
      text: (
        <>
          This <em>{car.typeofCar || "Unknown"}</em> is a remarkable vehicle
          that stands out for its exceptional{" "}
          <em>{car.fuelEfficiency ?? "N/A"}</em> km/L fuel efficiency and an
          impressive <em>{car.horsepower ?? "N/A"}</em> horsepower, ensuring a
          powerful yet economical drive. With a top speed of{" "}
          <em>{car.speed ?? "N/A"}</em> km/hr, it offers thrilling performance
          on the road. The <em>{car.transmission || "N/A"}</em> transmission
          guarantees a smooth and responsive driving experience. Safety is a top
          priority, and this car is equipped with advanced{" "}
          <em>{car.safetyFeatures || "N/A"}</em>. Additionally, the ample{" "}
          <em>{car.cargoSpace || "N/A"}</em> cargo space provides practicality
          for all your storage needs. Whether you’re commuting daily or
          embarking on long trips, this car promises a reliable and enjoyable
          ride.
        </>
      ),
    },
    {
      text: (
        <>
          This <em>{car.typeofCar || "Unknown"}</em> not only excels in
          performance but also offers exceptional{" "}
          <em>{car.interiorAndComfort || "N/A"}</em> a good interior and
          comfort, ensuring a comfortable and enjoyable ride. Known for its{" "}
          <em>{car.reliabilityAndMaintenance || "N/A"}</em> reliability and
          maintenance, it promises durability and low maintenance costs, making
          it a reliable choice. With a high <em>{car.resaleValue ?? "N/A"}</em>%
          resale value, it retains value over time, providing a great return on
          investment. The car also comes with a comprehensive{" "}
          <em>{car.warrantyAndAfterSalesService || "N/A"}</em> year warranty,
          offering peace of mind and excellent support after purchase. All these
          features are available within a budget of Ugshx.{" "}
          <em>{car.budget ?? "N/A"}</em>/=, making it a well-rounded and
          practical option for any discerning driver.
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>Find Your Car That Meets Your Needs</p>
          </div>
          <div className="carCard">
            <div className="displayCarPhotos">{displayCarPhotos(car)}</div>
            <div className="propertyName">
              <h3>{car.name || "Unnamed Car"}</h3>
              <p className="statusCode">{car.statusCode || "N/A"}</p>
            </div>
            <div className="carSpecificationCar">
              {specSections.map((section, index) => (
                <div key={index} className="carSpecificationCar-1">
                  {section.text}
                </div>
              ))}
              <div>
                <h4>Reach Out For More Information</h4>
                <div className="aboutProperty">
                  <div className="aboutProperty-1">Buy</div>
                  <div className="aboutProperty-1">Rent</div>
                  <div className="aboutProperty-1">Quotation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Whatsapp />
    </div>
  );
}

export default CarPage;
