import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProperties = (url, token) => {  // Added token as a parameter
  const [properties, setProperties] = useState([]);
  const [cars, setCars] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {};
        const response = await axios.get(url, config);
        setProperties(response.data);
        setCars(response.data);
        setEvents(response.data);
        setNotifications(response.data.data);
        setRequests(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);  // token is already in the dependency array

  return { properties, loading, error, cars, events, notifications, requests };
};

export default useFetchProperties;