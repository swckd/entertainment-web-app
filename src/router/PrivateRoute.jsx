import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Context API
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
