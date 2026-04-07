import { AlertCircle, CheckCircle, X } from "lucide-react";

export function StatusMessage({ type, message, onClose }) {
  const isError = type === "error";
  
  return (
    <div className="mb-6">
      <div className={`border-l-4 p-4 rounded-r-lg ${
        isError 
          ? "bg-red-50 border-red-500" 
          : "bg-green-50 border-green-500"
      }`}>
        <div className="flex items-start gap-3">
          {isError ? (
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className={`font-semibold ${isError ? "text-red-800" : "text-green-800"}`}>
              {isError ? "Upload Failed" : "Import Successful!"}
            </h4>
            <p className={`text-sm mt-1 ${isError ? "text-red-700" : "text-green-700"}`}>
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={isError ? "text-red-400 hover:text-red-600" : "text-green-400 hover:text-green-600"}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}