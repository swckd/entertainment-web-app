import React, { useEffect, useState } from "react";
// To Handle Redirections (from createSessionId)
import { useNavigate } from "react-router-dom";
// To get token from URL
import { useSearchParams } from "react-router-dom";
// CSS
import "./UserFormComponent.scss";

// Services
import AuthService from "../../services/AuthService";
import TheMovieDatabaseAPI from "../../services/TheMovieDatabaseAPI";

// Custom Modal Component
import CustomModal from "../CustomModal/CustomModal";

const UserFormComponent = () => {
  const navigate = useNavigate();

  // To get the token from the URL, since I don't save it
  const [searchParams] = useSearchParams();
  const [requestToken, setRequestToken] = useState(null);

  // searchParams.get("request_token")
  // State variables for the form

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

    setRequestToken(searchParams.get("request_token"));

    try {
      await AuthService.createSessionId(
        username,
        password,
        requestToken,
        navigate
      );
    } catch (error) {
      console.error("Failed to create Session ID", error);
    }
  };

  // State variables to control the modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    createRequestToken();
  };
  // This will manage the Token Creation, which is in TMDB web, and the API redirects back
  const createRequestToken = async () => {
    if (requestToken) {
      return;
    }
    try {
      const response = await TheMovieDatabaseAPI.createRequestToken();
      if (response.success) {
        // setRequestToken(response.request_token);
        const redirectToUrl = encodeURIComponent(
          `${window.location.origin}/login`
        );
        const authenticationUrl = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=${redirectToUrl}`;
        window.location.href = authenticationUrl;
      }
    } catch (error) {
      console.error("Failed to create Request Token", error);
    }
  };

  useEffect(() => {
    console.log(requestToken);

    if (!requestToken) {
      console.log(requestToken);
      // Function to open the modal
      setModalTitle("Warning");
      setModalContent(
        "You are going to be redirected to TMDB web to give your permission to be logged in."
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
        show={showModal}
      />
    </div>
  );
};

export default UserFormComponent;
