import React from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../components/PropertyCard"; // Import PropertyCard component

const PropertyResults = () => {
  const location = useLocation();
  const properties = location.state?.properties || [];

  return (
    <>
      {/* <WelcomePage /> */}
      <div className="property-results">
        <h1>Search Results</h1>
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>
      
    </>
  );
};

export default PropertyResults;
