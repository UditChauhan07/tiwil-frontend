import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("AccessToken");

  if (!token) {
    // If no token found, redirect to login page
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    const currentTime = Date.now() / 1000; // Get current time in seconds

    // Check if the token has expired
    if (decodedToken.exp < currentTime) {
      // If token expired, remove it and redirect to login
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("AccessToken");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />;
  }

  // If the token is valid and not expired, allow access to the route
  return children;
};

export default ProtectedRoute;
