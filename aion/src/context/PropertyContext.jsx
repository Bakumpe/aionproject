// PropertyContext.js
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import config from "../.config";

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/properties?populate=*`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, fetchProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext, PropertyProvider };
