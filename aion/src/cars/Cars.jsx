import React, { useContext, useEffect } from "react";
// import Footer from "../components/Footer";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import CarCard from "./CarCard";
import { CarContext } from "../context/CarContext";

function Cars() {
  const { cars, fetchCars } = useContext(CarContext);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>Cars For Hire</p>
          </div>
          <ul className="myCarList">
            {cars.length === 0 ? (
              <p>Loading cars...</p>
            ) : (
              cars.map((car, index) => <CarCard key={index} car={car} />)
            )}
          </ul>
        </div>
        {/* <div className="sideBar">
          <Footer />
        </div> */}
      </div>
      <Whatsapp />
    </>
  );
}

export default Cars;
