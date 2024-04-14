import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Context API
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.sessionId) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
