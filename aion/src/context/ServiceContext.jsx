import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import config from "../.config";

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]); // Initialized as an empty array for services
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null);      // Error state

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      setError(null);   // Clear any previous errors
      const response = await axios.get(`${config.apiUrl}/api/events?populate=*`);
      setServices(response.data.data); // Store the array inside `data`
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error.message || 'Failed to fetch services');
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  }, []);

  return (
    <ServiceContext.Provider value={{ services, fetchServices, loading, error }}>
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };