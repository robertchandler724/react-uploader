import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importing AuthContext to access authentication state

// A wrapper for portected routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Getting the token from AuthContext

  // If there is no token, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, render the children (protected component)
  return children;
};

export default ProtectedRoute;
// This component is used to protect routes that require authentication. If the user is not authenticated, they are redirected to the login page. If they are authenticated, the requested component is rendered.