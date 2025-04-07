import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import config from "../.config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("jwtToken")); // Get token from cookie
  const [isLoading, setIsLoading] = useState(true);

  // Cookie options for security
  const cookieOptions = {
    expires: 7, // Token expires in 7 days
    secure: true, // Only send over HTTPS
    httpOnly: true, // Prevent JavaScript access
    sameSite: "strict", // Prevent CSRF
  };

  // Fetch token from API
  const fetchToken = useCallback(async (identifier, password) => {
    try {
      const response = await axios.post(`${config.apiUrl}/api/auth/local`, {
        identifier,
        password,
      });

      if (response.status === 200 && response.data.jwt) {
        const jwtToken = response.data.jwt;
        Cookies.set("jwtToken", jwtToken, cookieOptions); // Store in cookie
        setToken(jwtToken);
        return jwtToken;
      }
      throw new Error("Authentication failed");
    } catch (error) {
      console.error("Authentication error:", error.message);
      return null;
    }
  }, []);

  // Fetch user data with token
  const fetchUserData = useCallback(async (jwtToken) => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      Cookies.remove("jwtToken"); // Remove invalid token
      setToken(null);
      return null;
    }
  }, []);

  // Initialize user with credentials
  const initializeUser = useCallback(
    async (identifier, password) => {
      const jwtToken = await fetchToken(identifier, password);
      if (jwtToken) {
        await fetchUserData(jwtToken);
      }
    },
    [fetchToken, fetchUserData]
  );

  // Logout function
  const logout = useCallback(() => {
    Cookies.remove("jwtToken"); // Remove token from cookie
    setToken(null);
    setUser(null);
  }, []);

  // Check for existing token on mount
  useEffect(() => {
    const verifyStoredToken = async () => {
      const storedToken = Cookies.get("jwtToken");
      if (storedToken && !user) {
        setToken(storedToken);
        const userData = await fetchUserData(storedToken);
        if (!userData) {
          logout(); // Clear invalid token
        }
      }
      setIsLoading(false);
    };

    verifyStoredToken();
  }, [fetchUserData, logout]);

  const contextValue = {
    user,
    setUser,
    token,
    setToken,
    isLoading,
    initializeUser,
    fetchToken,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;