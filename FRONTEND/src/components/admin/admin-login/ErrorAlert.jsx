// components/common/ErrorAlert.jsx
import { AlertCircle, X } from "lucide-react";

export const ErrorAlert = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium text-red-800 text-sm">Authentication Failed</p>
          <p className="text-xs text-red-600 mt-1">{error}</p>
        </div>
        <button onClick={onClear} className="text-red-400 hover:text-red-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};