import React from "react";
import { useLocation } from "react-router-dom";
import MyPropertyCard from "../components/PropertyCard";

const PropertyResults = () => {
  const location = useLocation();
  const properties = location.state?.properties || [];

  return (
    <>
      {/* <WelcomePage /> */}
      <div className="property-results">
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
