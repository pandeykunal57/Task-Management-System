"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider to wrap the app and manage auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("task_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Updated login function: fetches from mock API and stores user
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("task_user", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Login failed" };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("task_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
