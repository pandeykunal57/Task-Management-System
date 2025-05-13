"use client"; // ✅ Must be at the top for any file using hooks like useState or useEffect

import { createContext, useContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext(); // Make sure to export AuthContext

// AuthProvider to wrap the app and manage auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds current user
  const [loading, setLoading] = useState(true); // To prevent flicker on reload

  // Simulate loading user data from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("task_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the user from localStorage
    }
    setLoading(false); // Set loading to false once the check is done
  }, []);

  // Login function to store the user and update the context
  const login = (userData) => {
    setUser(userData); // Set the user data to state
    localStorage.setItem("task_user", JSON.stringify(userData)); // Save user data in localStorage
  };

  // Logout function to clear the user and remove the data from localStorage
  const logout = () => {
    setUser(null); // Clear the user data from state
    localStorage.removeItem("task_user"); // Remove the user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context easily
export const useAuth = () => useContext(AuthContext);
