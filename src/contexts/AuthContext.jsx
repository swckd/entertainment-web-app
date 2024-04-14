// The useContext hook is imported from React. It allows consuming the context value.
// The createContext function is imported from React. It's used to create a new context.

import { useContext, createContext, useState } from "react";

import useGetCookie from "../hooks/useGetCookie";

// Step 1: Define a context that will be shared within all the app
// The createContext() function creates a new context object.
// This context will hold the authentication state and provide it to consuming components.

const AuthContext = createContext();

// Step 2: Create a ContextWrapper component that has to be the parent of every consumer
// In this case is <AuthProvider />
// The prop, children, can be any component.
// This makes the authentication context available to all nested components.

const AuthProvider = ({ children }) => {
  // Retrieve the session_id from the cookie when the provider is first initialized
  const [sessionId, setSessionId] = useState(useGetCookie("session_id"));

  // Determine if the user is logged in based on the session ID
  const isLoggedIn = Boolean(sessionId);

  return (
    <AuthContext.Provider value={{ sessionId, setSessionId, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

//The useAuth custom hook is defined. It utilizes the useContext hook to access the authentication context created earlier.
//This hook can be used in any component to access the authentication state and related functions.
export const useAuth = () => {
  return useContext(AuthContext);
};

// The component <AuthProvider /> is used in App.js

// The useAuth() hook is used, among others, in UserDashboardPage, or PrivateRoute.
