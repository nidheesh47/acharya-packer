import { useNavigate } from "react-router";
import { useBulkOrderImport } from "../hooks/useBulkOrderImport";
import { BulkImportHeader } from "./BulkImportHeader";
import { TemplateCard } from "./TemplateCard";
import { TipsCard } from "./TipsCard";
import { StatusMessage } from "./StatusMessage";
import { FileDropZone } from "./FileDropZone";
import { ImportSummary } from "./ImportSummary";

export default function BulkOrderImport() {
  const navigate = useNavigate();
  const {
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
    TEMPLATE_URL
  } = useBulkOrderImport();

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <BulkImportHeader onBack={() => navigate(-1)} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Template & Guidelines */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <TemplateCard templateUrl={TEMPLATE_URL} />
              <TipsCard />
            </div>
          </div>

          {/* Right Column - Upload Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 sm:p-8">
                {/* Status Messages */}
                {error && (
                  <StatusMessage 
                    type="error" 
                    message={error} 
                    onClose={clearError} 
                  />
                )}

                {success && (
                  <StatusMessage 
                    type="success" 
                    message={success} 
                    onClose={clearSuccess} 
                  />
                )}

                {/* Upload Form */}
                <form onSubmit={handleUpload} className="space-y-6">
                  <FileDropZone
                    file={file}
                    dragActive={dragActive}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onFileSelect={handleFileSelect}
                  />

                  <button
                    type="submit"
                    disabled={loading || !file}
                    className={`w-full py-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center gap-3 ${
                      loading || !file
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing Upload...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5" />
                        Upload & Process File
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Results Section */}
              <ImportSummary result={result} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          input, button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

// Import missing icons
import { Loader2, Upload } from "lucide-react";