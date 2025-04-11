import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../.config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("jwtToken") || null); // Initialize as null if no token
  const [isLoading, setIsLoading] = useState(true);

  // Cookie options for security
  const cookieOptions = {
    expires: 7, // 7 days expiry
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
    // Note: httpOnly cannot be set client-side with js-cookie; requires server-side handling
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
        Cookies.set("jwtToken", jwtToken, cookieOptions);
        setToken(jwtToken);
        return jwtToken;
      }
      throw new Error("Authentication failed");
    } catch (error) {
      console.error("Authentication error:", error.message);
      throw error; // Rethrow to allow caller to handle
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
      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      Cookies.remove("jwtToken");
      setToken(null);
      setUser(null);
      return null;
    }
  }, []);

  // Initialize user with credentials
  const initializeUser = useCallback(
    async (identifier, password) => {
      setIsLoading(true);
      try {
        const jwtToken = await fetchToken(identifier, password);
        if (jwtToken) {
          await fetchUserData(jwtToken);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchToken, fetchUserData]
  );

  // Logout function
  const logout = useCallback(() => {
    Cookies.remove("jwtToken");
    setToken(null);
    setUser(null);
    setIsLoading(false);
  }, []);

  // Verify token on mount
  useEffect(() => {
    const verifyStoredToken = async () => {
      const storedToken = Cookies.get("jwtToken");
      if (storedToken && !user && !token) {
        setToken(storedToken);
        const userData = await fetchUserData(storedToken);
        if (!userData) {
          logout();
        }
      }
      setIsLoading(false);
    };

    verifyStoredToken();
  }, [fetchUserData, logout, user, token]);

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