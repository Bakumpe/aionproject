import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcomePage.css";
import config from "../.config";
import { Search } from "lucide-react";

function WelcomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  const myDisplayList = ["Perfect Home", "Real Estate", "Dream Home"];
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % myDisplayList.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [myDisplayList.length]);

  const handleSearch = async () => {
    const query = `?location=${location}&type=${type}`;
    const response = await fetch(`${config.apiUrl}/api/properties${query}`);
    const data = await response.json();

    const filteredProperties = data.filter((property) => {
      return (
        property.PriceTag >= parseFloat(minPrice) &&
        property.PriceTag <= parseFloat(maxPrice)
      );
    });

    setProperties(filteredProperties);
    navigate("/myFavorites", { state: { properties: filteredProperties } });
    // navigate("/", { state: { properties: filteredProperties } });
  };

  const showSearchBar = () => {
    setIsSearching(!isSearching);
  };

  return (
    <div className="welcomePage">
      <div className="myDisplayList">
        <p className="myDisplayList-1">Aion Finds Your</p> 
        <p>{myDisplayList[currentIndex]}</p>
      </div>

      <Search
        color="white"
        size={48}
        strokeWidth={2}
        className="searchIcon"
        onClick={showSearchBar}
      />

      {isSearching && (
        <div className="find">
          <div className="search">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              placeholder="Enter Minimum Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="search">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="maxPrice"
              placeholder="Enter Maximum Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="search">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Search Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="search">
            <label htmlFor="type">Type</label>
            <select
              name="select"
              id="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="apartment">Apartment</option>
              <option value="stand alone">Stand Alone</option>
              <option value="studio">Studio</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="shops">Shops</option>
              <option value="arcade space">Arcade Space</option>
            </select>
          </div>
          <div className="searchButton">
            <button type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}

      {/* <div className="results">
        {properties.map((property) => (
          <div key={property.id} className="property">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default WelcomePage;
