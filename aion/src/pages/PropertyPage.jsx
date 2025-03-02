import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../styles/propertyPage.css";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import House from "../assets/house.png";
import Type from "../assets/type.png";
import Garages from "../assets/garage.png";
import Size from "../assets/size.png";
import Land from "../assets/land.png";
import Year from "../assets/year.png";
import "../styles/form1.css";
import Form1 from "../forms/Form1";
import Footer from "../components/Footer";
import { PropertyContext } from "../context/PropertyContext";
import { UserContext } from "../context/UserContext";
import config from "../.config";

function displayPropertyPhotos(property) {
  if (property.PhotoUrl && property.PhotoUrl.length > 0) {
    return (
      <div className="myImages">
        {property.PhotoUrl.map((url, index) => (
          <img
            key={index}
            src={`${config.apiUrl}${url}`}
            alt="Property Image"
          />
        ))}
      </div>
    );
  } else if (property.photo && property.photo.length > 0) {
    return (
      <div className="myImages">
        {property.photo.map((photo, index) => (
          <img
            key={index}
            src={`${config.apiUrl}${photo.url}`}
            alt="Property Image"
          />
        ))}
      </div>
    );
  } else {
    return <p>No photos available for this property.</p>;
  }
}

function PropertyPage() {
  const { id } = useParams();
  const { user, initializeUser } = useContext(UserContext); // Use UserContext
  const { properties, fetchProperties } = useContext(PropertyContext); // Use PropertyContext

  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Example usage of context data and methods
    if (!user) {
      initializeUser("identifier", "password"); // Replace with actual credentials or logic
    }

    if (properties.length === 0) {
      fetchProperties();
    }
  }, [user, initializeUser, properties.length, fetchProperties]);

  useEffect(() => {
    const property = properties.find((prop) => prop.id === parseInt(id));
    setProperty(property);
  }, [id, properties]);

  // Check if the property data is available
  if (!property) {
    return <div>Loading...</div>;
  }

  // Extract the individual elements from the property data
  const {
    PropertyName,
    PropertyCategory,
    Location,
    NumberOfBedRooms,
    NumberOfBathrooms,
    Amenities,
    PriceTag,
    Description,
    NumberOfUnitsOfNeighbors,
    Garage,
    HouseSize,
    LandSize,
    YearBuilt,
  } = property;

  return (
    <>
      <div className="indexPage">
        <div className="navBar">
          <Header />
        </div>
        <div className="body">
          <div>
            <div className="propertyDetails">
              {displayPropertyPhotos(property)}
              <div className="propertyInformation">
                <div className="propertyInformation-1">
                  <h1>{PropertyName}</h1>
                  <h3>
                    Ugshs. {PriceTag} <span>/Month</span>
                  </h3>
                </div>
                <br />
                <div className="features">
                  <h2>Features</h2>
                  <div className="Bed">
                    <img src={Bed} alt="Bed" />
                    <h3>{NumberOfBedRooms}</h3>
                    <img src={Bathroom} alt="Bathrooms" />
                    <h3>{NumberOfBathrooms}</h3>
                    <img src={LocationPng} alt="Location" />
                    <h4>{Location}</h4>
                  </div>
                  <div className="amenities">
                    <h2>Amenities :</h2>
                    <div className="amenities1">
                      <p>{Amenities}</p>
                    </div>
                  </div>
                  <div className="description">
                    <h2>Description</h2>
                    <p>{Description}</p>
                  </div>
                  <div className="overView">
                    <div className="overViewGroup">
                      <img src={House} alt="House" />
                      <div>
                        <p>ID :</p>
                        <p>{property.id}</p>
                      </div>
                    </div>

                    <div className="overViewGroup">
                      <img src={Type} alt="House" />
                      <div>
                        <p>Type :</p>
                        <p>{PropertyCategory}</p>
                      </div>
                    </div>

                    <div className="overViewGroup">
                      <img src={Bed} alt="House" />
                      <div>
                        <p>Bedrooms :</p>
                        <p>{NumberOfBedRooms}</p>
                      </div>
                    </div>

                    <div className="overViewGroup">
                      <img src={Bathroom} alt="House" />
                      <div>
                        <p>Bathrooms :</p>
                        <p>{NumberOfBathrooms}</p>
                      </div>
                    </div>

                    <div className="overViewGroup">
                      <img src={Garages} alt="House" />
                      <div>
                        <p>Garages :</p>
                        <p>{Garage}</p>
                      </div>
                    </div>

                    <div className="overViewGroup">
                      <img src={Size} alt="House" />
                      <div>
                        <p>House Size :</p>
                        <p>{HouseSize} sq. ft.</p>
                      </div>
                    </div>

                    <div className="overViewGroup">
                      <img src={Land} alt="House" />
                      <div>
                        <p>Land Size :</p>
                        <p>{LandSize} sq. ft.</p>
                      </div>
                    </div>

                    <div className="overViewGroup">
                      <img src={Year} alt="House" />
                      <div>
                        <p>Year Built :</p>
                        <p>{YearBuilt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sideBar">
          <Footer />
        </div>
      </div>

      {/* <div className="form1">
        <Form1 />
      </div>
      <div className="googleMaps"></div> */}
    </>
  );
}

export default PropertyPage;
