import React, { useState } from "react";

function MultiCategorySearch() {
  // State for selected category and search parameters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams, setSearchParams] = useState({
    properties: { minCost: "", maxCost: "", location: "" },
    cars: { carType: "", status: "" },
    services: { serviceType: "" },
  });
  const [searchResults, setSearchResults] = useState([]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchResults([]); // Clear previous results when category changes
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

  // Simulated search function (replace with actual API calls)
  const performSearch = () => {
    let results = [];
    
    switch (selectedCategory) {
      case "properties":
        // Simulated property search logic
        results = mockPropertySearch(
          searchParams.properties.minCost,
          searchParams.properties.maxCost,
          searchParams.properties.location
        );
        break;
      case "cars":
        // Simulated car search logic
        results = mockCarSearch(
          searchParams.cars.carType,
          searchParams.cars.status
        );
        break;
      case "services":
        // Simulated service search logic
        results = mockServiceSearch(
          searchParams.services.serviceType
        );
        break;
      default:
        results = [];
    }
    
    setSearchResults(results);
  };

  // Mock search functions (replace with real data fetching)
  const mockPropertySearch = (minCost, maxCost, location) => {
    const properties = [
      { id: 1, name: "Luxury Villa", cost: 500000, location: "Nairobi" },
      { id: 2, name: "Beach House", cost: 300000, location: "Mombasa" },
    ];
    
    return properties.filter((prop) => {
      const matchesCost = 
        (!minCost || prop.cost >= parseInt(minCost)) &&
        (!maxCost || prop.cost <= parseInt(maxCost));
      const matchesLocation = 
        !location || prop.location.toLowerCase().includes(location.toLowerCase());
      return matchesCost && matchesLocation;
    });
  };

  const mockCarSearch = (carType, status) => {
    const cars = [
      { id: 1, type: "SUV", status: "renting" },
      { id: 2, type: "Sedan", status: "buying" },
    ];
    
    return cars.filter((car) => {
      const matchesType = 
        !carType || car.type.toLowerCase().includes(carType.toLowerCase());
      const matchesStatus = !status || car.status === status;
      return matchesType && matchesStatus;
    });
  };

  const mockServiceSearch = (serviceType) => {
    const services = [
      { id: 1, type: "Cleaning" },
      { id: 2, type: "Plumbing" },
    ];
    
    return services.filter((service) =>
      !serviceType || service.type.toLowerCase().includes(serviceType.toLowerCase())
    );
  };

  // Render search fields based on category
  const renderSearchFields = () => {
    switch (selectedCategory) {
      case "properties":
        return (
          <div className="property-search-fields">
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
          <div className="car-search-fields">
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
          <div className="service-search-fields">
            <input
              type="text"
              name="serviceType"
              value={searchParams.services.serviceType}
              onChange={(e) => handleInputChange(e, "services")}
              placeholder="Type of Service (e.g., Cleaning, Plumbing)"
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
      
      {/* Category Selection */}
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
          Services
        </button>
      </div>

      {/* Dynamic Search Fields */}
      {selectedCategory && (
        <div className="search-form">
          {renderSearchFields()}
          <button onClick={performSearch}>Search</button>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Results</h3>
          <ul>
            {searchResults.map((item) => (
              <li key={item.id}>
                {selectedCategory === "properties" && (
                  `${item.name} - ${item.cost} - ${item.location}`
                )}
                {selectedCategory === "cars" && (
                  `${item.type} - ${item.status}`
                )}
                {selectedCategory === "services" && (
                  `${item.type}`
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