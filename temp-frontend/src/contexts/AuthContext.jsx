import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/auth/verify-token/"
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Auth verification failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          email,
          password,
        }
      );

      const { user: userData, token: authToken } = response.data;

      setUser(userData);
      setToken(authToken);
      localStorage.setItem("token", authToken);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        userData
      );

      const { user: newUser, token: authToken } = response.data;

      setUser(newUser);
      setToken(authToken);
      localStorage.setItem("token", authToken);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
        errors: error.response?.data?.errors || {},
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/auth/profile/update/",
        profileData
      );
      setUser(response.data.profile);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Profile update failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Profile update failed",
      };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/change-password/",
        passwordData
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Password change failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Password change failed",
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
