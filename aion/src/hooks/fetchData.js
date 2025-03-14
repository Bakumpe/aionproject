import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProperties = (url) => {
  const [properties, setProperties] = useState([]);
  const [cars, setCars] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProperties(response.data);
        setCars(response.data);
        setEvents(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { properties, loading, error, cars, events };
};

export default useFetchProperties;
