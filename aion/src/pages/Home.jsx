import React, { useState } from "react";
import useFetchProperties from "../hooks/fetchData";
import Header from "../components/Header";
import "../styles/propertyCard.css";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import config from "../.config";
import useResponsivePropertiesPerPage from "../hooks/useResponsiveness";
import MyPropertyCard from "../components/PropertyCard";
import "../styles/index.css";

function FetchData() {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = useResponsivePropertiesPerPage();

  const url = `${config.apiUrl}/api/properties?populate=*`;

  const { properties, loading, error } = useFetchProperties(url);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  // Log the response to debug
  console.log("Properties:", properties);

  // Ensure properties is an array before using slice
  if (!Array.isArray(properties)) {
    return <p>Data format error: expected an array of properties.</p>;
  }

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = properties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>

        <div className="body">
          <div className="bodyTitle">
            {" "}
            <p>Properties</p>
          </div>
          <div className="unorderedList">
            <ul className="propertyListing">
              {currentProperties.map((property) => (
                <MyPropertyCard property={property} key={property.id} />
              ))}
            </ul>
            <div className="pagination">
              <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
              </button>
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="sideBar">
          <Footer />
        </div>
      </div>

      {/* <WelcomePage /> */}
      {/* <SubHeading /> */}

      <Whatsapp />
    </>
  );
}

export default FetchData;
