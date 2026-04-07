// hooks/useBulkSkuImport.js
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { skuImportService } from "../services/skuImportService";
import { isValidFileType } from "../utils/fileUtils";

export const useBulkSkuImport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState("");

  // Auth check
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("auth_token");
    const admin = localStorage.getItem("admin");

    if (!token || !admin) {
      navigate("/user/login", { replace: true });
      return false;
    }
    return true;
  }, [navigate]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFileType(droppedFile.name)) {
        setFile(droppedFile);
        setError("");
      } else {
        setError("Please upload only CSV or Excel files");
      }
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (isValidFileType(selectedFile.name)) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please select only CSV or Excel files");
      }
    }
  }, []);

  const handleUpload = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResult(null);
    setUploadProgress(0);
    setProcessingStep("Starting import process...");

    if (!file) {
      setError("Please select a CSV / Excel file");
      return;
    }

    if (!checkAuth()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const data = await skuImportService.bulkImport(file, token);
      
      clearInterval(progressInterval);
      
      setSuccess("Bulk SKU import completed successfully!");
      setResult(data);
      setUploadProgress(100);
      setProcessingStep("Import completed successfully!");
    } catch (err) {
      setError(err.message);
      setUploadProgress(0);
      setProcessingStep("Import failed");
    } finally {
      setLoading(false);
    }
  }, [file, checkAuth]);

  const resetForm = useCallback(() => {
    setFile(null);
    setError("");
    setSuccess("");
    setResult(null);
    setUploadProgress(0);
    setProcessingStep("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const clearError = useCallback(() => setError(""), []);
  const clearSuccess = useCallback(() => setSuccess(""), []);

  return {
    // State
    file,
    loading,
    error,
    success,
    result,
    dragActive,
    uploadProgress,
    processingStep,
    fileInputRef,
    dropZoneRef,
    
    // Actions
    handleDrag,
    handleDrop,
    handleFileSelect,
    handleUpload,
    resetForm,
    clearError,
    clearSuccess,
  };
};