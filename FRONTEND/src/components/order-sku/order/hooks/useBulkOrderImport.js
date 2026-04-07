import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const APP_URL = import.meta.env.VITE_APP_URL;
const TEMPLATE_URL =
  "https://docs.google.com/spreadsheets/d/169TnbHtfi8WQq2z5JChE4ZXGxGoXAmxUkeI7Mmz7jVQ/edit";

export function useBulkOrderImport() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const admin = localStorage.getItem("admin");

    if (!token || !admin) {
      navigate("/user/login", { replace: true });
    }
  }, [navigate]);

  const validateAndSetFile = (file) => {
    const fileName = file.name.toLowerCase();
    const validExtensions = [".csv", ".xls", ".xlsx"];
    const isValidExtension = validExtensions.some((ext) =>
      fileName.endsWith(ext),
    );

    if (!isValidExtension) {
      setError("Please select a CSV or Excel file (.csv, .xls, .xlsx)");
      setFile(null);
      return false;
    }

    setFile(file);
    setError("");
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResult(null);

    if (!file) {
      setError("Please select a file (CSV or Excel)");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${APP_URL}/api/order/bulk-import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Bulk import failed");
      }

      setSuccess("Bulk order import completed successfully!");
      setResult(data);
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");
  const clearSuccess = () => setSuccess("");

  return {
    file,
    loading,
    error,
    success,
    result,
    dragActive,
    validateAndSetFile,
    handleDrag,
    handleDrop,
    handleUpload,
    clearError,
    clearSuccess,
    TEMPLATE_URL,
  };
}
