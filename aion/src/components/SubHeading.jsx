import React, { useContext, useEffect, useState } from "react";
import "../styles/subHeadings.css";
import { PropertyContext } from "../context/PropertyContext";
import { Link } from "react-router-dom";

const SubHeading = () => {
  const { properties, fetchProperties } = useContext(PropertyContext);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category) {
      fetchProperties(category);
    }
  }, [category, fetchProperties]);

  return (
    <div className="properties">
      <div className="propertyHead1">Featured Properties</div>
      <div className="propertyHead2">Recommended For You</div>
      <div className="propertyHead3">
        <div className="viewAll">
          <Link to={"/"}  onClick={() => setCategory("view-all")}>
            View All
          </Link>
        </div>
        <div className="apartment">
          <Link to={"/"} onClick={() => setCategory("Apartment")}>
            ECEG
          </Link>
        </div>
        <div className="apartment">
          <Link to={"/"} onClick={() => setCategory("Apartment")}>
            Apartments
          </Link>
        </div>
        <div className="apartment">
          <Link to={"/"}  onClick={() => setCategory("Standalone")}>
            Stand Alone
          </Link>
        </div>
        <div className="apartment">
          <Link to={"/"} onClick={() => setCategory("Villa")}>
            Villa
          </Link>
        </div>
        <div className="apartment">
          <Link to={"/"} onClick={() => setCategory("Office")}>
            Office
          </Link>
        </div>
        <div className="apartment">
          <Link to={"/"} onClick={() => setCategory("Shops")}>
            Shops
          </Link>
        </div>
        <div className="apartment">
          <Link to={"/"} onClick={() => setCategory("ArcadeSpace")}>
            Arcade Space
          </Link>
        </div>
      </div>
      {properties.length > 0 && (
        <div className="propertyList">
          {properties.map((property) => (
            <div key={property.id} className="propertyItem">
              <h3>{property.name}</h3>
              <p>{property.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubHeading;
