import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../.config";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const fetchToken = useCallback(async (identifier, password) => {
    try {
      const response = await axios.post(`${config.apiUrl}/api/auth/local`, {
        identifier,
        password,
      });
      console.log("Auth response:", response.data);
      if (response.status === 200 && response.data.jwt) {
        const jwtToken = response.data.jwt;
        setToken(jwtToken);
        return jwtToken;
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error fetching token", error);
      return null;
    }
  }, []);

  const initializeUser = useCallback(
    async (identifier, password) => {
      const jwtToken = await fetchToken(identifier, password);
      if (jwtToken) {
        try {
          const response = await axios.get(`${config.apiUrl}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }
    },
    [fetchToken]
  );

  return (
    <UserContext.Provider
      value={{ user, setUser, token, initializeUser, fetchToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
