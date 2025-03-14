import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import config from "../.config";

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]); // Initialized as an empty array
  const [loading, setLoading] = useState(false);    // Add loading state
  const [error, setError] = useState(null);         // Add error state (optional)

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      setError(null);   // Clear any previous errors
      const response = await axios.get(`${config.apiUrl}/api/properties?populate=*`);
      setProperties(response.data.data); // Store the array inside `data`
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(error.message || 'Failed to fetch properties');
    } finally {
      setLoading(false); // Set loading to false after fetch completes (success or failure)
    }
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, fetchProperties, loading, error }}>
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext, PropertyProvider };