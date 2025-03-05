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
        <Link
          to={"/"}
          onClick={() => setCategory("view-all")}
          className="viewAll"
        >
          View All
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("Apartment")}
          className="apartment"
        >
          ECEG
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("Apartment")}
          className="apartment"
        >
          Apartments
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("Standalone")}
          className="apartment"
        >
          Cars
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("Villa")}
          className="apartment"
        >
          Villa
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("Office")}
          className="apartment"
        >
          Office
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("Shops")}
          className="apartment"
        >
          Shops
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("ArcadeSpace")}
          className="apartment"
        >
          Arcade Space
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("ArcadeSpace")}
          className="apartment"
        >
          Stand Alone
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("ArcadeSpace")}
          className="apartment"
        >
          Service Providers
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("ArcadeSpace")}
          className="apartment"
        >
          Stand Alone
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("ArcadeSpace")}
          className="apartment"
        >
          Stand Alone
        </Link>
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
