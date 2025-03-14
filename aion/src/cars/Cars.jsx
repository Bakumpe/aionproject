import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import CarCard from "./CarCard";
import { CarContext } from "../context/CarContext";
import useResponsivePropertiesPerPage from "../hooks/useResponsiveness";

function Cars() {
  const { cars, fetchCars } = useContext(CarContext);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = useResponsivePropertiesPerPage();
  
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Ensure cars is an array before using slice
  if (!Array.isArray(cars)) {
    return <p>Data format error: expected an array of cars.</p>;
  }

  const totalPages = Math.ceil(cars.length / carsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

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
            {currentCars.length === 0 ? (
              <div className="loadingProperties">
              <span className="spinner"></span> Loading Cars...
            </div>
            ) : (
              currentCars.map((car, index) => <CarCard key={index} car={car} />)
            )}
          </ul>
          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default Cars;
