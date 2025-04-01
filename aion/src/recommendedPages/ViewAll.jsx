import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import Whatsapp from "../components/Whatsapp";
import HomeProperty from "../components/HomeProperty";
import CarCard from "../cars/CarCard";
import MyServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";
import { CarContext } from "../context/CarContext";
import { ServiceContext } from "../context/ServiceContext";

function ViewAll() {
  // Separate context hooks for each context
  const {
    properties,
    fetchProperties,
    loading: propertyLoading,
  } = useContext(PropertyContext);
  const { cars, fetchCars, isLoading: carLoading } = useContext(CarContext);
  const {
    services,
    fetchServices,
    loading: serviceLoading,
  } = useContext(ServiceContext);

  // Fetch all data on component mount
  useEffect(() => {
    fetchProperties();
    fetchCars();
    fetchServices();
  }, [fetchProperties]);

  // Check if any data is still loading
  // const isLoading = propertyLoading || carLoading || serviceLoading;
  const isLoading = propertyLoading || carLoading || serviceLoading;

  return (
    <div className="indexPage">
      <div className="navBar">
        <Header />
      </div>

      <div className="body">
        <div className="bodyTitle">
          <p>View All Listings</p>
          <Link to="/search" className="searchme">
            <div>Search For Properties</div>
          </Link>
        </div>

        {isLoading ? (
          <div className="loadingProperties">
            <span className="spinner"></span> Loading content...
          </div>
        ) : (
          <div className="viewallContentContainer">
            <section className="viewallSection">
              <h2 className="viewallSection-1">Properties</h2>
              <div className="myUnorderedList">
                <HomeProperty properties={properties} />
              </div>
            </section>

            <section className="viewallSection">
              <h2>Cars</h2>
              <div className="viewallCarList">
                {cars && cars.length > 0 ? (
                  cars.map((car) => <CarCard key={car.id} car={car} />)
                ) : (
                  <p>No cars available.</p>
                )}
              </div>
            </section>

            <section className="viewallSection">
              <h2>Services</h2>
              <div className="viewallCarList">
                {services && services.length > 0 ? (
                  services.map((service) => (
                    <MyServiceCard key={service.id} event={service} />
                  ))
                ) : (
                  <p>No services available.</p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      <Whatsapp />
    </div>
  );
}

export default ViewAll;
