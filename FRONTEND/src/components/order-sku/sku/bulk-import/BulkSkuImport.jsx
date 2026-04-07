// pages/BulkSkuImport.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2, Upload } from "lucide-react"; // Add Upload import
import { useBulkSkuImport } from "../hooks/useBulkSkuImport";
import { ImportHeader } from "./ImportHeader";
import { TemplateCard } from "./TemplateCard";
import { SupportedPlatformsCard } from "./SupportedPlatformsCard";
import { FileDropZone } from "./FileDropZone";
import { UploadProgress } from "./UploadProgress";
import { ImportResults } from "./ImportResults";
import { ErrorAlert } from "./ErrorAlert";
import { SuccessAlert } from "./SuccessAlert";

export default function BulkSkuImport() {
  const navigate = useNavigate();
  const {
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
    handleDrag,
    handleDrop,
    handleFileSelect,
    handleUpload,
    resetForm,
    clearError,
    clearSuccess,
  } = useBulkSkuImport();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const admin = localStorage.getItem("admin");

    if (!token || !admin) {
      navigate("/user/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <ImportHeader
          showNewImport={!!result}
          onNewImport={resetForm}
          onViewSkus={() => navigate("/all/sku/list")}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <TemplateCard />
            <SupportedPlatformsCard />
          </div>

          <div className="lg:col-span-2">
            <ErrorAlert error={error} onClear={clearError} />
            <SuccessAlert success={success} onClear={clearSuccess} />

            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 sm:p-8">
                <form onSubmit={handleUpload} className="space-y-6">
                  <FileDropZone
                    file={file}
                    dragActive={dragActive}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onFileSelect={handleFileSelect}
                    fileInputRef={fileInputRef}
                  />

                  {loading && (
                    <UploadProgress
                      progress={uploadProgress}
                      processingStep={processingStep}
                    />
                  )}

                  <button
                    type="submit"
                    disabled={loading || !file}
                    className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 shadow-sm ${
                      loading || !file
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-md"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing Import...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Upload className="h-5 w-5" />
                        {result ? "Import More SKUs" : "Upload & Process SKUs"}
                      </span>
                    )}
                  </button>
                </form>
              </div>

              <ImportResults result={result} onViewSkus={() => navigate("/all/sku/list")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}