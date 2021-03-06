import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  const isAuthenticated = localStorage.getItem("user") || isLoggedIn;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
