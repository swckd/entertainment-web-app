import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context API
import { useAuth } from "../contexts/AuthContext";

// AuthService API
import AuthService from "../services/AuthService";

const UserDashboardPage = () => {
  const { sessionId, setSessionId } = useAuth();
  const navigate = useNavigate();

  const handleLogOutButton = () => {
    AuthService.deleteSessionId(sessionId, setSessionId, navigate);
  };

  return (
    <>
      <p>Session ID: {sessionId}</p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={handleLogOutButton}
      >
        Log Out
      </button>
    </>
  );
};

export default UserDashboardPage;
