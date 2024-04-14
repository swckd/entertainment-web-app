import React from "react";
import UserFormComponent from "../components/UserFormComponent/UserFormComponent";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const UserLoginPage = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Navigate to="/user-dashboard" />
  ) : (
    <>
      <UserFormComponent />
    </>
  );
};

export default UserLoginPage;
