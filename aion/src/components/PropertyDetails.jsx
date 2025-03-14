import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import LocationPng from "../assets/location.png";
import Bed from "../assets/bed.png";
import Bathroom from "../assets/bathroom.png";
import House from "../assets/house.png";
import Type from "../assets/type.png";
import Garages from "../assets/garage.png";
import Size from "../assets/size.png";
import Land from "../assets/land.png";
import Year from "../assets/year.png";
import { PropertyContext } from "../context/PropertyContext";
import { UserContext } from "../context/UserContext";
import config from "../.config";

function displayPropertyPhotos(property) {
  if (
    !property?.photos ||
    !Array.isArray(property.photos) ||
    property.photos.length === 0
  ) {
    return <p>No photos available for this property.</p>;
  }

  const photos = property.photos.map((p) => ({
    url: p.url,
    isFullUrl: p.url.startsWith("https://res.cloudinary.com"),
  }));

  return (
    <div className="myPropertyImages">
      {photos.map((photo, index) => (
        <div key={index} className="myPropertyImages-1">
          <img
            src={photo.isFullUrl ? photo.url : `${config.apiUrl}${photo.url}`}
            alt={`Property Image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

function PropertyDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { properties, fetchProperties, loading, error } =
    useContext(PropertyContext);
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  const handleRentClick = () => {
    if (property) {
      navigate(`/rent`, { state: { property } });
    }
  };

  useEffect(() => {
    if (properties.length === 0 && !loading) {
      fetchProperties();
    }
  }, [properties, fetchProperties, loading]);

  useEffect(() => {
    if (properties.length > 0) {
      const foundProperty = properties.find((prop) => prop.id === parseInt(id));
      setProperty(foundProperty || null);
    }
  }, [id, properties]);

  const {
    propertyName,
    propertyCategory,
    location,
    numberOfBedRooms,
    numberOfBathrooms,
    amenities,
    priceTag,
    description,
    garage,
    houseSize,
    landSize,
    yearBuilt,
  } = property || {};

  function handleCheckout() {
    if (property && user) {
      navigate("/payment", { state: { property, user } });
    } else if (!user) {
      navigate("/login", { state: { from: `/rent/${id}` } });
    } else {
      console.error("No property available for checkout");
      // Optionally set an error state to display to the user
    }
  }

  return (
    <div className="propertyDetails">
      {loading ? (
        <div className="loadingProperties">
          <span className="spinner"></span>
          <span>Loading property details...</span>
        </div>
      ) : error ? (
        <div className="errorProperties">Error: {error}</div>
      ) : properties.length === 0 ? (
        <div>No properties available to display.</div>
      ) : !property ? (
        <div>Property not found.</div>
      ) : (
        <>
          <div>{displayPropertyPhotos(property)}</div>
          <div className="propertyInformation">
            <div className="propertyInformation-1">
              <div className="propertyName">
                <p>{propertyName}</p>
                <p className="statusCode">{property.statusCode}</p>
                <p className="pricetag">Ugshs. {priceTag}</p>
              </div>
            </div>
            <br />
            <div className="features">
              <h2>Features</h2>
              <div className="Bed">
                <div className="Bed-1">
                  <img src={Bed} alt="Bed" />
                  <p>{numberOfBedRooms ?? "N/A"}</p>
                </div>
                <div className="Bed-1">
                  <img src={Bathroom} alt="Bathrooms" />
                  <p>{numberOfBathrooms ?? "N/A"}</p>
                </div>
                <div className="Bed-1">
                  <img src={House} alt="House" />
                  <p>{property.id}</p>
                </div>
                <div className="Bed-1">
                  <img src={Type} alt="Type" />
                  <p>{propertyCategory || "N/A"}</p>
                </div>
                <div className="Bed-1">
                  <img src={Garages} alt="Garage" />
                  <p>{garage ?? "N/A"}</p>
                </div>
                <div className="Bed-1">
                  <img src={Size} alt="Size" />
                  <p>{houseSize ? `${houseSize} sq. ft.` : "N/A"}</p>
                </div>
                <div className="Bed-1">
                  <img src={Land} alt="Land" />
                  <p>{landSize ? `${landSize} sq. ft.` : "N/A"}</p>
                </div>
                <div className="Bed-1">
                  <img src={Year} alt="Year" />
                  <p>{yearBuilt || "N/A"}</p>
                </div>
              </div>
              <div className="loco">
                <div className="Bed-1">
                  <img src={LocationPng} alt="Location" />
                  <p>{location || "N/A"}</p>
                </div>
              </div>
              <div className="amenities">
                <p>Amenities:</p>
                <div className="amenities1">
                  <p>{amenities || "None specified"}</p>
                </div>
              </div>
              <div className="description">
                <p>Description</p>
                <p>{description || "No description available"}</p>
              </div>
            </div>
          </div>
          <div className="termsAndConditions">
            <h2>Terms and Conditions</h2>
            <ul>
              <li>Rental payment is due on the 1st of each month.</li>
              <li>
                A security deposit equivalent to one month’s rent is required.
              </li>
              <li>
                No pets allowed without prior approval from the property owner.
              </li>
              <li>Tenant is responsible for minor repairs and maintenance.</li>
              <li>Termination requires 30 days’ written notice.</li>
              <li>
                Violation of terms may result in eviction and forfeiture of
                deposit.
              </li>
            </ul>
          </div>

          <div className="agreement">
            <h2>Rental Agreement</h2>
            <p>By proceeding to checkout, you agree to the following:</p>
            <ul>
              <li>
                I, the tenant, agree to rent the property located at {location}{" "}
                for a monthly fee of Ugshs. {priceTag}.
              </li>
              <li>
                The rental term begins upon payment confirmation and ends as per
                the agreed termination notice.
              </li>
              <li>
                I will adhere to all terms and conditions outlined above and
                maintain the property in good condition.
              </li>
              <li>
                Any disputes will be resolved through mediation before legal
                action.
              </li>
            </ul>
          </div>

          <div className="checkout">
            <div className="aboutProperty">
              <div className="aboutProperty-1">Contact Agent</div>
              <div
                className="aboutProperty-1"
                onClick={handleCheckout}
                disabled={!user}
              >
                Proceed to Checkout
              </div>
            </div>
            {!user && (
              <p className="loginPrompt">
                Please <NavLink to="/login">log in</NavLink> to proceed with
                payment.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PropertyDetails;
