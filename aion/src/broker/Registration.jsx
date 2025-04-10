import React from "react";
import RegisterProperty from "./RegisterProperty";
import { Link } from "react-router-dom";

function Registration({ type }) {
  return (
    <>
      {type === "property" ? (
        <div className="registerPropertyAndCars">
          <div className="registeringProperty">
            <div className="registeringProperty-1">
              <h4>Register Property For Rent</h4>
              <h5>Tips on how to Register</h5>
              <p>
                Property Details: Provide detailed information about the
                property, including location, size, number of bedrooms,
                bathrooms, and any unique features.
              </p>
              <p>
                Photos: Upload high-quality photos of the property to give
                potential renters a clear view of what it looks like.
              </p>
              <p>
                Rental Terms: Specify the rental price, lease terms, and any
                additional fees or requirements.
              </p>
              <p>
                Contact Information: Provide contact details for interested
                renters to reach out.
              </p>
              <Link to={"/registerproperty"}>
                {" "}
                <button>Register Property</button>
              </Link>
            </div>

            <div className="registeringProperty-1">
              <h4>Register Property For Sale</h4>
              <h5>Tips on how to Register</h5>
              <p>
                Property Details: Similar to rental properties, provide detailed
                information about the property, including location, size, number
                of bedrooms, bathrooms, and any unique features.
              </p>
              <p>
                Photos: Upload high-quality photos of the property to give
                potential buyers a clear view.
              </p>
              <p>
                Selling Price: Specify the selling price and any other terms or
                conditions of the sale.
              </p>
              <p>
                Contact Information: Provide contact details for interested
                buyers to reach out.
              </p>
              <Link to={"/registerproperty"}>
                {" "}
                <button>Register Property</button>
              </Link>
            </div>
          </div>
        </div>
      ) : type === "car" ? (
        <div className="registerPropertyAndCars">
          <div className="registeringProperty">
            <div className="registeringProperty-1">
              <h4>Register Car For Rent</h4>
              <h5>Tips on how to Register</h5>
              <p>
                Car Details: Provide detailed information about the car,
                including make, model, year, mileage, and any unique features.
              </p>
              <p>
                Photos: Upload high-quality photos of the car to give potential
                renters a clear view.
              </p>
              <p>
                Rental Terms: Specify the rental price, terms, and any
                additional fees or requirements.
              </p>
              <p>
                Contact Information: Provide contact details for interested
                renters to reach out.
              </p>
              <Link to={"/registercar"}>
                {" "}
                <button>Register Car</button>
              </Link>
            </div>
            <div className="registeringProperty-1">
              <h4>Register Car For Sale</h4>
              <h5>Tips on how to Register</h5>
              <p>
                Car Details: Provide detailed information about the car,
                including make, model, year, mileage, and any unique features.
              </p>
              <p>
                Photos: Upload high-quality photos of the car to give potential
                buyers a clear view.
              </p>
              <p>
                Selling Price: Specify the selling price and any other terms or
                conditions of the sale.
              </p>
              <p>
                Contact Information: Provide contact details for interested
                buyers to reach out.
              </p>
              <Link to={"/registercar"}>
                {" "}
                <button>Register Car</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="registerPropertyAndCars">
          <div className="registeringProperty">
            <div className="registeringProperty-1">
              <h4>Register Service</h4>
              <h5>Tips on how to Register</h5>
              <p>
                Service Details: Provide detailed information about the service,
                including the type of service, description, and any unique
                features.
              </p>
              <p>
                Photos: Upload high-quality photos or any visual representations
                related to the service to give potential clients a clear view.
              </p>
              <p>
                Service Terms: Specify the pricing, terms, and any additional
                fees or requirements.
              </p>
              <p>
                Contact Information: Provide contact details for interested
                clients to reach out.
              </p>
              <Link to={"/registerservice"}>
                {" "}
                <button>Register Service</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Registration;
