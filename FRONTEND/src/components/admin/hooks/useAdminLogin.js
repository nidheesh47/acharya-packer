// hooks/useAdminLogin.js
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { authService } from "../services/authService";

export const useAdminLogin = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  useEffect(() => {
    setMounted(true);
    const rememberedEmail = localStorage.getItem("remembered_email");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }

    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.adminLogin(email, password);

      if (rememberMe) {
        localStorage.setItem("remembered_email", email);
      } else {
        localStorage.removeItem("remembered_email");
      }

      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      if (data.must_change_password) {
        navigate("/user/password/update", { replace: true });
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [email, password, rememberMe, navigate]);

  const handleForgotPasswordClick = useCallback(() => {
    setShowConfirmAlert(true);
  }, []);

  const handleConfirmReset = useCallback(() => {
    setShowConfirmAlert(false);
    setShowForgotModal(true);
    setResetEmail(email || "");
  }, [email]);

  const handleResetPassword = useCallback(async (e) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage("");
    setResetError("");

    try {
      const data = await authService.resetPassword(resetEmail);
      setResetMessage(data.message);
      
      setTimeout(() => {
        setShowForgotModal(false);
        setResetMessage("");
        setResetEmail("");
      }, 3000);
      
    } catch (err) {
      setResetError(err.message);
    } finally {
      setResetLoading(false);
    }
  }, [resetEmail]);

  const closeModals = useCallback(() => {
    setShowForgotModal(false);
    setShowConfirmAlert(false);
    setResetMessage("");
    setResetError("");
  }, []);

  const clearError = useCallback(() => setError(""), []);

  return {
    // State
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    mounted,
    showForgotModal,
    resetEmail,
    setResetEmail,
    resetLoading,
    resetMessage,
    resetError,
    showConfirmAlert,
    
    // Actions
    handleSubmit,
    handleForgotPasswordClick,
    handleConfirmReset,
    handleResetPassword,
    closeModals,
    clearError,
  };
};