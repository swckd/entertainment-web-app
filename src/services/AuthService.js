import { useAuth } from "../contexts/AuthContext";
import TheMovieDatabaseAPI from "./TheMovieDatabaseAPI"



const createSessionId = async (username, password, requestToken, navigate) => {
  try {
    console.log('Creating session ID...'); // Add this line

    const response = await TheMovieDatabaseAPI.createSession(username, password, requestToken);
    console.log('Response:', response); // And this line

    if (response) {
      console.log('Coookie...'); // Add this line

      document.cookie = `session_id=${response.session_id}; path=/`;
      console.log('Document Cookie:', document.cookie); // And this line

      navigate("/user-dashboard");
    }

  } catch (error) {
    console.error("Failed to create Session ID", error)
  }
}

const deleteSessionId = async (session_id, setSessionId, navigate) => {
  console.log(typeof setSessionId); // add this line
  try {
    const response = await TheMovieDatabaseAPI.deleteSession(session_id);
    if (response) {
      document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setSessionId(null);
      navigate("/");
    }
  } catch (error) {
    console.error("Failed to delete Session ID", error)
  }
}

export default {
  createSessionId,
  deleteSessionId
}