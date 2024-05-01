import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context API
import { useAuth } from "../contexts/AuthContext";

// AuthService API
import AuthService from "../services/AuthService";

const UserDashboardPage = () => {
  const {
    sessionId,
    setSessionId,
    accountData,
    setIsLoggedIn,
    setAccountData,
  } = useAuth();
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    AuthService.deleteSessionId(
      sessionId,
      setSessionId,
      setIsLoggedIn,
      setAccountData
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
