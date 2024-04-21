
import TheMovieDatabaseAPI from "./TheMovieDatabaseAPI"

const validateRequestToken = async (username, password, requestToken, setShowAlert, setRequestToken) => {
  try {
    const response = await TheMovieDatabaseAPI.validateRequestToken(username, password, requestToken);

    if (response.success === true) {
      const validatedRequestToken = response.request_token;
      return validatedRequestToken;
    }
    return response;
  } catch (error) {
    console.error("Failed to Validate Request Token", error);
    setShowAlert(true)
    setRequestToken("");
  }
}

const createSessionId = async (validatedRequestToken) => {

  try {
    const response = await TheMovieDatabaseAPI.createSession(validatedRequestToken);
    if (response.success === true) {
      document.cookie = `session_id=${response.session_id}; path=/`;
      return response;

    }
  } catch (error) {
    console.error("Failed to create Session ID", error);

  }
}

const deleteSessionId = async (session_id, setSessionId) => {
  try {
    const response = await TheMovieDatabaseAPI.deleteSession(session_id);
    if (response.success === true) {
      document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setSessionId();

    }
  } catch (error) {
    console.error("Failed to delete Session ID", error)
  }
}

const AuthService = { createSessionId, validateRequestToken, deleteSessionId }

export default AuthService