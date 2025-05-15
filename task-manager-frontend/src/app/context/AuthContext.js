"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Create the context
export const AuthContext = createContext();

// AuthProvider to wrap the app and manage auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);  // <-- store token separately
  const [loading, setLoading] = useState(true);
  const router = useRouter();  // 👈 Add router

  // Load user and token from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("task_user");
    const storedToken = localStorage.getItem("task_token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Login function: fetches from API and stores user + token
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
        setToken(data.token);
        localStorage.setItem("task_user", JSON.stringify(data.user));
        localStorage.setItem("task_token", data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Login failed" };
    }
  };

  // Logout function: clears data and redirects
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("task_user");
    localStorage.removeItem("task_token");
    router.push("/");  // 👈 Redirect to landing page
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
