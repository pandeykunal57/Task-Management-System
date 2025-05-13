// frontend/src/app/context/AuthContext.js

import { createContext, useContext, useEffect, useState } from 'react';

// Create the context object to be shared across the app
const AuthContext = createContext();

// AuthProvider will wrap your entire app and provide user state to all components
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    // Try to load user from localStorage on page refresh
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync user state to localStorage whenever it changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [authUser]);

  // Function to log user in and set the auth state
  const login = (userData) => {
    setAuthUser(userData); // Includes name, email, token, role, etc.
  };

  // Function to clear auth state and log user out
  const logout = () => {
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context anywhere in the app
export const useAuth = () => useContext(AuthContext);
