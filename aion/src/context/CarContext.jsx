import React, { createContext, useState, useCallback, useContext } from "react";
import axios from "axios";
import config from "../.config";
import { UserContext } from "./UserContext"; // Assuming UserContext is in the same directory

const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(UserContext); // Get token from UserContext

  const fetchCars = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Configure headers if token exists
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get(`${config.apiUrl}/api/cars?populate=*`, {
        headers,
      });

      // Handle Strapi response structure
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setCars(data);
      console.log("Fetched cars:", data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError(
        error.response?.data?.error?.message || "Failed to fetch cars"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]); // Add token as dependency since it affects the request

  return (
    <CarContext.Provider value={{ cars, fetchCars, isLoading, error }}>
      {children}
    </CarContext.Provider>
  );
};

export { CarContext, CarProvider };