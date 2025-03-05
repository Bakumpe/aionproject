// CarContext.js
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import config from "../.config";

const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);

  const fetchCars = useCallback(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/cars?populate=*`);
      setCars(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching cars', error);
    }
  }, []);

  return (
    <CarContext.Provider value={{ cars, fetchCars }}>
      {children}
    </CarContext.Provider>
  );
};

export { CarContext, CarProvider };
