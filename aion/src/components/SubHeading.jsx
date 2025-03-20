import React, { useContext, useEffect, useState } from "react";
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
          to={"/eceg"}
          onClick={() => setCategory("Apartment")}
          className="apartment"
        >
          Ezy Stay
        </Link>

        <Link
          to={"/"}
          onClick={() => setCategory("Apartment")}
          className="apartment"
        >
          Apartments
        </Link>

        <Link
          to={"/cars"}
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
          to={"/services"}
          onClick={() => setCategory("ArcadeSpace")}
          className="apartment"
        >
          Services
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
      </div>
      
    </div>
  );
};

export default SubHeading;
