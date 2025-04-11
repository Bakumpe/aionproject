import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // Check if the current route is related to property details
  const isPropertyDetailsRoute = location.pathname.includes("/property/:id");

  if (!user) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/loginRegister" state={{ from: location }} replace />;
  }

  if (isPropertyDetailsRoute && !user.hasPaid) {
    
    return (
      <Navigate
        to="/payment"
        state={{ 
          from: location,
          message: "Please complete payment to access property details"
        }}
        replace
      />
    );
  }

  // If user is authenticated and either has paid or isn't accessing property details,
  // allow access to the route
  return <Outlet />;
};

export default ProtectedRoute;