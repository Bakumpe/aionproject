import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import House from "../assets/house.png";
import Type from "../assets/type.png";
import Garages from "../assets/garage.png";
import Size from "../assets/size.png";
import Land from "../assets/land.png";
import Year from "../assets/year.png";
// import Footer from "../components/Footer";
import { PropertyContext } from "../context/PropertyContext";
import { UserContext } from "../context/UserContext";
import config from "../.config";
import { NavLink } from "react-router-dom";

function displayPropertyPhotos(property) {
  let photos = [];
  let isFullUrl = false;

  if (property.photo && property.photo.length > 0) {
    photos = property.photo.map((p) => {
      return {
        url: p.url,
        isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
      };
    });
  }

  if (photos.length > 0) {
    return (
      <div className="myPropertyImages">
        {photos.map((photo, index) => (
          <div key={index} className="myPropertyImages-1">
            {photo.isFullUrl ? (
              <NavLink to={photo.url}>
                <img src={photo.url} alt={`Car Image ${index + 1}`} />
              </NavLink>
            ) : (
              <img
                src={`${config.apiUrl}${photo.url}`}
                alt={`Car Image ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return <p>No photos available for this car.</p>;
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
              <div>
                {displayPropertyPhotos(property)}
              </div>

              <div className="propertyInformation">
                <div className="propertyInformation-1">
                  <p>{PropertyName}</p>
                  <p>
                    Ugshs. {PriceTag} <span>/Month</span>
                  </p>
                </div>
                <br />
                <div className="features">
                  <h2>Features</h2>
                  <div className="Bed">
                    <div className="Bed-1">
                      <img src={Bed} alt="Bed" />
                      <h3>{NumberOfBedRooms}</h3>
                    </div>

                    <div className="Bed-1">
                      <img src={Bathroom} alt="Bathrooms" />
                      <h3>{NumberOfBathrooms}</h3>
                    </div>

                    <div className="Bed-1">
                      <img src={House} alt="House" />
                      <p>{property.id}</p>
                    </div>

                    <div className="Bed-1">
                      <img src={Type} alt="House" />
                      <p>{PropertyCategory}</p>
                    </div>

                    <div className="Bed-1">
                      <img src={Bathroom} alt="House" />
                      <p>{NumberOfBathrooms}</p>
                    </div>

                    <div className="Bed-1">
                      <img src={Garages} alt="House" />
                      <p>{Garage}</p>
                    </div>

                    <div className="Bed-1">
                      <img src={Size} alt="House" />
                      <p>{HouseSize} sq. ft.</p>
                    </div>

                    <div className="Bed-1">
                      <img src={Land} alt="House" />
                      <p>{LandSize} sq. ft.</p>
                    </div>

                    <div className="Bed-1">
                      <img src={Year} alt="House" />
                      <p>{YearBuilt}</p>
                    </div>
                  </div>
                  <div className="loco">
                    <div className="Bed-1">
                      <img src={LocationPng} alt="Location" />
                      <p>{Location}</p>
                    </div>
                  </div>
                  <div className="amenities">
                    <p>Amenities :</p>
                    <div className="amenities1">
                      <p>{Amenities}</p>
                    </div>
                  </div>
                  <div className="description">
                    <p>Description</p>
                    <p>{Description}</p>
                  </div>
                </div>
              </div>
              <div className="aboutProperty">
                <div className="aboutProperty-1">Contact Agent</div>
                <div className="aboutProperty-1">Get Quotation</div>
                <div className="aboutProperty-1">Submit Proposal</div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="sideBar">
          <Footer />
        </div> */}
      </div>

      {/* <div className="form1">
        <Form1 />
      </div>
      <div className="googleMaps"></div> */}
    </>
  );
}

export default PropertyPage;
