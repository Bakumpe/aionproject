import React, { useContext, useEffect, useState } from "react";
import useResponsivePropertiesPerPage from "../hooks/useResponsiveness";
import MyPropertyCard from "../components/PropertyCard";
import { PropertyContext } from "../context/PropertyContext";

function HomeProperty({ properties: externalProperties }) {
  const { properties: contextProperties, fetchProperties, loading, error } =
    useContext(PropertyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = useResponsivePropertiesPerPage();

  // Use external properties if provided, otherwise fall back to context properties
  const properties = externalProperties || contextProperties;

  useEffect(() => {
    if (!externalProperties) {
      fetchProperties(); // Only fetch if not using external properties
    }
  }, [fetchProperties, externalProperties]);

  if (!Array.isArray(properties)) {
    return <p>Unexpected data format. Please try again later.</p>;
  }

  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = properties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <ul className="propertyListing" style={{ minHeight: "200px" }}>
        {loading && !externalProperties ? (
          <div className="loadingProperties">
            <span className="spinner"></span> Loading properties...
          </div>
        ) : error && !externalProperties ? (
          <p>Error fetching properties: {error.message}</p>
        ) : currentProperties.length === 0 ? (
          <p>No properties available at the moment.</p>
        ) : (
          currentProperties.map((property) => (
            <MyPropertyCard key={property.id} property={property} />
          ))
        )}
      </ul>
      {totalPages > 0 && (!loading || externalProperties) && (
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

export default HomeProperty;