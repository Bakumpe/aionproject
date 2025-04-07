import { useState, useEffect } from "react"; // Importing React hooks for state and side effects
import axios from "axios"; // Importing axios for making HTTP requests

// Custom hook to fetch various types of data from an API
const useFetchProperties = (url, token) => {  // Takes URL and authentication token as parameters
  // State for storing different types of data
  const [properties, setProperties] = useState([]); // State for properties data
  const [cars, setCars] = useState([]); // State for cars data
  const [events, setEvents] = useState([]); // State for events data
  const [notifications, setNotifications] = useState([]); // State for notifications data
  const [requests, setRequests] = useState([]); // State for requests data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to store any errors

  // Effect hook to fetch data when URL or token changes
  useEffect(() => {
    // Async function to handle data fetching
    const fetchData = async () => {
      try {
        // Configure headers with token if provided
        const config = token
          ? {
              headers: {
                Authorization: `Bearer ${token}`, // Add Bearer token to headers for authenticated requests
              },
            }
          : {}; // Empty config object if no token

        // Make GET request to the provided URL with config
        const response = await axios.get(url, config);
        
        // Update all state variables with response data
        setProperties(response.data); // Set properties data
        setCars(response.data); // Set cars data
        setEvents(response.data); // Set events data
        setNotifications(response.data.data); // Set notifications (nested data property)
        setRequests(response.data); // Set requests data
      } catch (error) {
        // Handle any errors that occur during fetch
        setError(error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Execute the fetch function
    fetchData();
  }, [url, token]);  // Dependency array: re-run effect when url or token changes

  // Return all state variables as an object
  return { 
    properties, 
    loading, 
    error, 
    cars, 
    events, 
    notifications, 
    requests 
  };
};

// Export the custom hook for use in other components
export default useFetchProperties;