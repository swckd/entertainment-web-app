import React, { useEffect, useState } from "react";
// To Handle Redirections (from createSessionId)
import { useNavigate } from "react-router-dom";

// CSS
import "./UserFormComponent.scss";

// Services
import AuthService from "../../services/AuthService";
import TheMovieDatabaseAPI from "../../services/TheMovieDatabaseAPI";

// Custom Modal Component
import CustomModal from "../CustomModal/CustomModal";

// Auth Custom Hook
import { useAuth } from "../../contexts/AuthContext";

// React Bootstrap
import { Alert } from "react-bootstrap";

const UserFormComponent = () => {
  const { setIsLoggedIn, setSessionId, isLoggedIn, sessionId } = useAuth();
  const navigate = useNavigate();

  const [requestToken, setRequestToken] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Functions related to the form
  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    if (!requestToken) {
      setShowModal(true);
    }
    try {
      const validatedRequestToken = await AuthService.validateRequestToken(
        username,
        password,
        requestToken,
        setShowAlert,
        setRequestToken
      );

      if (validatedRequestToken) {
        // Call createSessionId with the validatedRequestToken
        const response = await AuthService.createSessionId(
          validatedRequestToken
        );

        if (response.success) {
          // When the session ID is created, update the AuthProvider's state
          setSessionId(response.session_id);
          setIsLoggedIn(true);
          setShowAlert(false);

          if (sessionId && isLoggedIn) {
            navigate("/user-dashboard/");
          }
        }
      }
    } catch (error) {
      console.error("Failed to create Session ID", error);
    }
  };

  // State variables to control the alert
  const [showAlert, setShowAlert] = useState(false);

  // State variables to control the modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    createRequestToken();
  };

  const onDecline = () => {
    navigate("/");
  };
  // This will manage the Token Creation, which is in TMDB web, and the API redirects back
  const createRequestToken = async () => {
    if (requestToken) {
      return;
    }
    try {
      const response = await TheMovieDatabaseAPI.createRequestToken();
      if (response) {
        setRequestToken(response.request_token);
      }
    } catch (error) {
      console.error("Failed to create Request Token", error);
    }
  };

  useEffect(() => {
    if (!requestToken) {
      // Function to open the modal
      setModalTitle("Warning");
      setModalContent(
        "You are going to be logged-in in TMDB, a 3rd Party. Please Accept or Decline."
      );
      setShowModal(true);
    }
  }, [requestToken]);

  return (
    <div className="UserFormComponent rounded w-50 m-auto p-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleFormSubmission}>
        {requestToken ? (
          <div className="alert alert-secondary" role="alert">
            You hace successfully accepted the Authenticacion Request. Please
            insert your email and password below to continue.
          </div>
        ) : (
          ""
        )}
        {showAlert ? (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <p className="fw-bold">
              Your username or password might be wrong, or you haven't
              registered.
            </p>
            <p className="m-0">
              If you want to reset your password click{" "}
              <Alert.Link
                href="https://www.themoviedb.org/reset-password"
                target="_blank"
              >
                here
              </Alert.Link>
              .
            </p>
            <p className="m-0">
              If you want to register click{" "}
              <Alert.Link
                href="https://www.themoviedb.org/signup"
                target="_blank"
              >
                here
              </Alert.Link>
              .
            </p>
          </Alert>
        ) : (
          ""
        )}

        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            placeholder="Username"
            value={username}
            onChange={handleSetUsername}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Password"
            value={password}
            onChange={handleSetPassword}
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <CustomModal
        title={modalTitle}
        content={modalContent}
        onHide={closeModal}
        onDecline={onDecline}
        show={showModal}
      />
    </div>
  );
};

export default UserFormComponent;
