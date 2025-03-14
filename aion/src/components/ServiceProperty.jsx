import React, { useState } from "react";
import useFetchProperties from "../hooks/fetchData";
import config from "../.config";
import useResponsivePropertiesPerPage from "../hooks/useResponsiveness";
import MyServiceCard from "../components/ServiceCard";

function ServiceProperty() {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = useResponsivePropertiesPerPage();
  const url = `${config.apiUrl}/api/events?populate=*`;
  const { events, loading, error } = useFetchProperties(url);

  console.log("Fetch Result:", { events, loading, error });

  // Extract the data array from properties
  const propertyList = events?.data || [];

  if (!Array.isArray(propertyList)) {
    return <p>Unexpected data format. Please try again later.</p>;
  }

  const totalPages = Math.ceil(propertyList.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = propertyList.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  console.log("Pagination:", {
    currentPage,
    totalPages,
    startIndex,
    currentProperties,
  });

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <ul className="propertyListing" style={{ minHeight: "200px" }}>
        {loading ? (
          <div className="loadingProperties">
            <span className="spinner"></span> Loading properties...
          </div>
        ) : error ? (
          <p>Error fetching properties: {error.message}</p>
        ) : currentProperties.length === 0 ? (
          <p>No properties available at the moment.</p>
        ) : (
          currentProperties.map((event) => (
            <MyServiceCard key={event.id} event={event} />
          ))
        )}
      </ul>
      {totalPages > 0 && !loading && (
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
      )}
    </>
  );
}

export default ServiceProperty;
