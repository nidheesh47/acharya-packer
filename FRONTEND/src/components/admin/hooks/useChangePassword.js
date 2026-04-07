// hooks/useChangePassword.js
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { passwordService } from "../services/passwordService";

export const useChangePassword = () => {
  const navigate = useNavigate();
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Password requirements state
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Auth check
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("auth_token");
    const adminRaw = localStorage.getItem("admin");

    if (!token || !adminRaw) {
      navigate("/user/login", { replace: true });
      return;
    }

    try {
      const admin = JSON.parse(adminRaw);

      if (admin.role === "admin") {
        navigate("/unauthorized", { replace: true });
        return;
      }

      setRole(admin.role);
    } catch {
      navigate("/user/login", { replace: true });
    }
  }, [navigate]);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!newPassword) return 0;
    
    const requirements = {
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };
    
    setPasswordRequirements(requirements);
    return Object.values(requirements).filter(Boolean).length;
  }, [newPassword]);

  const getStrengthColor = useCallback(() => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength === 4) return "bg-blue-500";
    return "bg-green-500";
  }, [passwordStrength]);

  const getStrengthText = useCallback(() => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Fair";
    if (passwordStrength === 4) return "Good";
    return "Strong";
  }, [passwordStrength]);

  const getStrengthBgColor = useCallback(() => {
    if (passwordStrength <= 2) return "text-red-400";
    if (passwordStrength === 3) return "text-yellow-400";
    if (passwordStrength === 4) return "text-blue-400";
    return "text-green-400";
  }, [passwordStrength]);

  const validateForm = useCallback(() => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return false;
    }

    if (!oldPassword) {
      setError("Old password is required");
      return false;
    }

    if (passwordStrength < 3) {
      setError("Password must meet minimum security requirements");
      return false;
    }

    return true;
  }, [oldPassword, newPassword, confirmPassword, passwordStrength]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      await passwordService.changePassword(token, oldPassword, newPassword);

      setSuccess("Password updated successfully. Please log in again.");

      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/user/login";
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [oldPassword, newPassword, validateForm]);

  const clearError = useCallback(() => setError(""), []);
  const clearSuccess = useCallback(() => setSuccess(""), []);

  return {
    // State
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    role,
    mounted,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    error,
    success,
    passwordRequirements,
    passwordStrength,
    
    // Computed values
    getStrengthColor,
    getStrengthText,
    getStrengthBgColor,
    
    // Actions
    handleSubmit,
    clearError,
    clearSuccess,
  };
};