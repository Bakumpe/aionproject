import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import HomeProperty from "../components/HomeProperty";
import { Link } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";

function ECEG() {
  const { properties, fetchProperties, loading } = useContext(PropertyContext);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Filter properties to only include "ezy-stay"
  const ezyStayProperties = properties.filter(
    (property) => property?.propertyCategory === "ezy-stay"
  );

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>Ezy Stay</p>
            <div>
              <Link to="/search" className="searchme">
                <div>Search For Properties</div>
              </Link>
            </div>
          </div>
          <div className="myUnorderedList">
            {loading ? (
              <div className="loadingProperties">
                <span className="spinner"></span> Loading properties...
              </div>
            ) : (
              <HomeProperty properties={ezyStayProperties} />
            )}
          </div>
        </div>
      </div>
      <Whatsapp />
    </>
  );
}

export default ECEG;
