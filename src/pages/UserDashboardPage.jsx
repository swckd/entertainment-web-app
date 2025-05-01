import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../assets/placeholder.jpg";

// Context API
import { useAuth } from "../contexts/AuthContext";

// AuthService API
import AuthService from "../services/AuthService";

const UserDashboardPage = () => {

  // Contexts
  const {
    setAvatar,
    sessionId,
    setSessionId,
    accountData,
    setIsLoggedIn,
    setAccountData,
  } = useAuth();

  // Navigation
  const navigate = useNavigate();

  // Handlers
  const handleLogOutButton = () => {
    AuthService.deleteSessionId(
      sessionId,
      setSessionId,
      setIsLoggedIn,
      setAccountData,
      setAvatar(avatarImg)
    );
    navigate("/");
  };

  return (
    <>
      {accountData ? (
        <>
          <p>Logged in as {accountData.username}</p>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogOutButton}
          >
            Log Out
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default UserDashboardPage;
