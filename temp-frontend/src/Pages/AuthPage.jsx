import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/editor");
    }
  }, [isAuthenticated, navigate]);

  const handleAuthSuccess = (data) => {
    // The useEffect will handle the redirect when isAuthenticated becomes true
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default AuthPage;
