// PropertyContext.js
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import config from "../.config";

const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/cars?populate=*`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  }, []);

  return (
    <CarContext.Provider value={{ properties, fetchProperties }}>
      {children}
    </CarContext.Provider>
  );
};

export { CarContext, CarProvider };
