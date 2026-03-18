"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, getProfile } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfile();

        setUser({
          _id: profile._id,
          name: profile.name,
          email: profile.email,
          role: profile.role
        });

      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginService(credentials);

      localStorage.setItem("token", data.token);

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role
      };

      setUser(userData);

      return userData;

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}