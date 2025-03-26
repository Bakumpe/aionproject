import React, { use, useContext, useState } from "react";
import axios from "axios";
import useFetchProperties from "../hooks/fetchData";
import config from "../.config";
import { UserContext } from "../context/UserContext";

function MultiCategorySearch() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useState({
    properties: { minCost: "", maxCost: "", location: "" },
    cars: { carType: "", status: "" },
    services: { serviceType: "" },
  });
  const [searchResults, setSearchResults] = useState([]);
  const {user, token} = useContext(UserContext);

  // Replace with your actual Strapi API base URL and token if needed
  const API_BASE_URL = `${config.apiUrl}`; // Update with your API URL
  const API_TOKEN = token; // Optional, remove if not needed

  // Fetch data using the custom hook for each endpoint
  const { properties, loading: propLoading } = useFetchProperties(
    `${API_BASE_URL}/properties`,
    API_TOKEN
  );
  const { cars, loading: carsLoading } = useFetchProperties(
    `${API_BASE_URL}/cars`,
    API_TOKEN
  );
  const { events, loading: eventsLoading } = useFetchProperties(
    `${API_BASE_URL}/events`,
    API_TOKEN
  );

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchResults([]);
  };

  // Handle input changes
  const handleInputChange = (e, category) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value,
      },
    }));
  };

  // Updated search functions using Strapi data
  const performSearch = () => {
    let results = [];
    
    switch (selectedCategory) {
      case "properties":
        results = propertySearch(
          searchParams.properties.minCost,
          searchParams.properties.maxCost,
          searchParams.properties.location
        );
        break;
      case "cars":
        results = carSearch(
          searchParams.cars.carType,
          searchParams.cars.statusCode
        );
        break;
      case "services": // Using events instead of services
        results = eventSearch(
          searchParams.services.serviceType
        );
        break;
      default:
        results = [];
    }
    
    setSearchResults(results);
  };

  // Search functions using fetched data
  const propertySearch = (minCost, maxCost, location) => {
    if (propLoading || !properties) return [];
    
    return properties.filter((prop) => {
      const attributes = prop.attributes || {};
      const cost = attributes.cost || 0;
      const propLocation = attributes.location || "";
      
      const matchesCost = 
        (!minCost || cost >= parseInt(minCost)) &&
        (!maxCost || cost <= parseInt(maxCost));
      const matchesLocation = 
        !location || propLocation.toLowerCase().includes(location.toLowerCase());
      return matchesCost && matchesLocation;
    });
  };

  const carSearch = (carType, status) => {
    if (carsLoading || !cars) return [];
    
    return cars.filter((car) => {
      const attributes = car.attributes || {};
      const type = attributes.type || "";
      const carStatus = attributes.status || "";
      
      const matchesType = 
        !carType || type.toLowerCase().includes(carType.toLowerCase());
      const matchesStatus = !status || carStatus === status;
      return matchesType && matchesStatus;
    });
  };

  const eventSearch = (serviceType) => {
    if (eventsLoading || !events) return [];
    
    return events.filter((event) => {
      const attributes = event.attributes || {};
      const type = attributes.type || "";
      
      return !serviceType || 
        type.toLowerCase().includes(serviceType.toLowerCase());
    });
  };

  // Render search fields (unchanged)
  const renderSearchFields = () => {
    switch (selectedCategory) {
      case "properties":
        return (
          <div className="search-fields">
            <input
              type="number"
              name="minCost"
              value={searchParams.properties.minCost}
              onChange={(e) => handleInputChange(e, "properties")}
              placeholder="Min Cost"
            />
            <input
              type="number"
              name="maxCost"
              value={searchParams.properties.maxCost}
              onChange={(e) => handleInputChange(e, "properties")}
              placeholder="Max Cost"
            />
            <input
              type="text"
              name="location"
              value={searchParams.properties.location}
              onChange={(e) => handleInputChange(e, "properties")}
              placeholder="Location"
            />
          </div>
        );
      case "cars":
        return (
          <div className="search-fields">
            <input
              type="text"
              name="carType"
              value={searchParams.cars.carType}
              onChange={(e) => handleInputChange(e, "cars")}
              placeholder="Type of Car (e.g., SUV, Sedan)"
            />
            <select
              name="status"
              value={searchParams.cars.status}
              onChange={(e) => handleInputChange(e, "cars")}
            >
              <option value="">Select Status</option>
              <option value="renting">Renting</option>
              <option value="buying">Buying</option>
            </select>
          </div>
        );
      case "services":
        return (
          <div className="search-fields">
            <input
              type="text"
              name="serviceType"
              value={searchParams.services.serviceType}
              onChange={(e) => handleInputChange(e, "services")}
              placeholder="Type of Event"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-category-search">
      <h2>Search Categories</h2>
      
      <div className="category-buttons">
        <button
          onClick={() => handleCategoryChange("properties")}
          className={selectedCategory === "properties" ? "active" : ""}
        >
          Properties
        </button>
        <button
          onClick={() => handleCategoryChange("cars")}
          className={selectedCategory === "cars" ? "active" : ""}
        >
          Cars
        </button>
        <button
          onClick={() => handleCategoryChange("services")}
          className={selectedCategory === "services" ? "active" : ""}
        >
          Events
        </button>
      </div>

      {selectedCategory && (
        <div className="search-form">
          {renderSearchFields()}
          <button onClick={performSearch} disabled={propLoading || carsLoading || eventsLoading}>
            {propLoading || carsLoading || eventsLoading ? "Loading..." : "Search"}
          </button>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Results</h3>
          <ul>
            {searchResults.map((item) => (
              <li key={item.id}>
                {selectedCategory === "properties" && (
                  `${item.attributes?.name || "Property"} - ${item.attributes?.cost || 0} - ${item.attributes?.location || "N/A"}`
                )}
                {selectedCategory === "cars" && (
                  `${item.attributes?.type || "Car"} - ${item.attributes?.status || "N/A"}`
                )}
                {selectedCategory === "services" && (
                  `${item.attributes?.type || "Event"}`
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MultiCategorySearch;