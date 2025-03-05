import React from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../components/PropertyCard"; // Import PropertyCard component
import "../styles/index.css";
import MyPropertyCard from "../components/PropertyCard";

const PropertyResults = () => {
  const location = useLocation();
  const properties = location.state?.properties || [];

  return (
    <>
      {/* <WelcomePage /> */}
      <div className="property-results">
        <h1 className="searchResult">Search Results</h1>
        <ul className="propertyListing">
          {properties.length > 0 ? (
            properties.map((property) => (
              <MyPropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p className="noFound">No properties found</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default PropertyResults;
