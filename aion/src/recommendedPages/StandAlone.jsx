import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import HomeProperty from "../components/HomeProperty";
import { Link } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";

/****This component handles StandAlone houses */

function StandAlone() {
  const { properties, fetchProperties, loading } = useContext(PropertyContext);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Filter properties to only include "ezy-stay"
  const ezyStayProperties = properties.filter(
    (property) => property?.propertyCategory === "standAlone"
  );

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div className="bodyTitle">
            <p>StandAlone</p>
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

export default StandAlone;
// This code is a React component that displays a list of properties filtered by the "StandAlone" category. It uses the PropertyContext to fetch and manage property data, and includes a header and a WhatsApp component for user interaction.
// The component uses the useEffect hook to fetch properties when it mounts, and conditionally renders a loading spinner or the list of properties based on the loading state. The component also includes a link to a search page for users to find other properties.