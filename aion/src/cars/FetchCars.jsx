import React, { useState } from "react";
import config from "../.config";
import useResponsivePropertiesPerPage from "../hooks/useResponsiveness";
import useFetchProperties from "../hooks/fetchData";
import MyCardForCar from "./MyCardForCar";


function FetchCars() {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = useResponsivePropertiesPerPage();

  const url = `${config.apiUrl}/api/cars?populate=*`;

  const { cars, loading, error } = useFetchProperties(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  // Log the response to debug
  console.log("Cars:", cars);

  // Ensure properties is an array before using slice
  if (!Array.isArray(cars)) {
    return <p>Data format error: expected an array of properties.</p>;
  }

  const totalPages = Math.ceil(cars.length / propertiesPerPage);

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

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = cars.slice(
    startIndex,
    startIndex + propertiesPerPage
  );
  return (
    <>
      <div className="body">
        <div className="unorderedList">
          <ul className="propertyListing">
            {currentProperties.map((property) => (
              <MyCardForCar property={property} key={property.id} />
            ))}
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
    </>
  );
}
export default FetchCars;
