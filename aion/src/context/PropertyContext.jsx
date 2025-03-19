import React, { createContext, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import config from "../.config";
import { UserContext } from './UserContext';

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]); // Initialized as an empty array
  const [loading, setLoading] = useState(false);    // Add loading state
  const [error, setError] = useState(null);         // Add error state (optional)
  const {token} = useContext(UserContext);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      setError(null);   // Clear any previous errors
      
      // Configure headers if token exist
      const headers = token? {Authorization: `Bearer ${token}`} : {};

      const response = await axios.get(`${config.apiUrl}/api/properties?populate=*`,{
        headers,
      });

      // Handle Strapi response structure
      const data = Array.isArray(response.data)
      ? response.data
      : response.data.data || [];
      setProperties(data);
    } catch (error) {
      console.error("Error fetching Properties:", error);
      setError(
        error.response?.data?.error?.message || "Failed to fetch properties"
      );
    } finally {
      setLoading(false);
    }
  }, [token]); // Add token as dependency since it affects the request

  return (
    <PropertyContext.Provider value={{ properties, fetchProperties, loading, error }}>
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext, PropertyProvider };