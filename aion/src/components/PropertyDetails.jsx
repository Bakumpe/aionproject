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
                <p className="pricetag">Ugshs. {priceTag}</p>
              </div>
            </div>
            <br />
            <div className="features">
              <div className="features-1">
                <h2>Features</h2>
                <p className="statusCode">{property.statusCode}</p>
              </div>

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
              <li>
                <strong>Compliance with Ugandan Land Laws:</strong> All tenancy
                agreements shall adhere to the Land Act (Cap 227) of Uganda. The
                landlord retains ownership rights, and tenants must respect
                leasehold conditions as verified by the Ministry of Lands,
                Housing, and Urban Development.
              </li>
              <li>
                <strong>Compliance with Landlord’s Terms:</strong> Tenants must
                strictly adhere to the landlord’s rules as outlined in the
                tenancy agreement, including restrictions on subletting,
                property modifications, or use for unlawful purposes, per the
                Ugandan Contract Act (Cap 73).
              </li>
              <li>
                <strong>Timely Payment:</strong> Rent shall be paid in Ugandan
                Shillings (UGX) on or before the agreed due date (e.g., 5th of
                each month). Late payments incur a penalty of 5% of the monthly
                rent or the statutory interest rate under Ugandan law, whichever
                is lower.
              </li>
              <li>
                <strong>Cleanliness of the House:</strong> Tenants are
                responsible for maintaining the interior cleanliness of the
                property, including regular cleaning of floors, walls, and
                fixtures. Failure to comply may result in deductions from the
                security deposit upon exit.
              </li>
              <li>
                <strong>Cleanliness of the Compound:</strong> Tenants must keep
                the compound tidy, including proper disposal of waste and upkeep
                of any shared gardens or pathways, in line with municipal
                by-laws and landlord instructions.
              </li>
              <li>
                <strong>Security of the Property:</strong> Tenants shall ensure
                all doors, windows, and gates are locked when the property is
                unoccupied. The landlord is not liable for losses due to tenant
                negligence in securing the premises.
              </li>
              <li>
                <strong>Vigilance:</strong> Tenants must remain vigilant and
                report any suspicious activities or maintenance issues (e.g.,
                structural damage, trespassing) to the landlord within 48 hours
                to ensure the safety and integrity of the property.
              </li>
              <li>
                <strong>Environmental Compliance:</strong> Tenants must comply
                with the National Environment Act (2019) by avoiding activities
                that harm the environment (e.g., illegal waste dumping) on the
                property or its surroundings.
              </li>
              <li>
                <strong>Termination Clause:</strong> The landlord may terminate
                the tenancy with 30 days’ notice for breach of these terms
                (e.g., non-payment, uncleanliness), as per the Ugandan Contract
                Act. Tenants must vacate in an orderly manner, leaving the
                property clean.
              </li>
              <li>
                <strong>Dispute Resolution:</strong> Disputes between landlord
                and tenant shall be resolved through mediation or arbitration in
                Uganda, per the Arbitration and Conciliation Act (Cap 4), before
                escalating to courts with jurisdiction in Uganda.
              </li>
            </ul>
          </div>

          {/* <div className="agreement">
            <h2>Renting or Buying Agreement</h2>
            <p>By proceeding to checkout, you agree to the following:</p>
            <ul>
              <li>Implement Renting or Buying Agreement here</li>
            </ul>
          </div> */}

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
