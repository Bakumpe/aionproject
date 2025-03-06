import React, { useState } from "react";
import useFetchProperties from "../hooks/fetchData";
import config from "../.config";
import useResponsivePropertiesPerPage from "../hooks/useResponsiveness";
import MyPropertyCard from "../components/PropertyCard";

function EasyComeEsyGo() {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = useResponsivePropertiesPerPage();

  const url = `${config.apiUrl}/api/properties?populate=*`; // Defined my URL here to fetch data from Strapi

  const { properties, loading, error } = useFetchProperties(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

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
  const currentProperties = properties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  return (
    <>
      <div className="ecegList">
        <ul className="ecegPropertyList">
          {currentProperties.map((property) => (
            <MyPropertyCard property={property} />
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
    </>
  );
}

export default EasyComeEsyGo;
