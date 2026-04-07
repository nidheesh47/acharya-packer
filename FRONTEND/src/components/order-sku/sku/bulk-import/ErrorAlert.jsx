// components/bulk-import/ErrorAlert.jsx
import { AlertCircle, X } from "lucide-react";

export const ErrorAlert = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div className="mb-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-red-800">Import Failed</h4>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
          <button onClick={onClear} className="text-red-400 hover:text-red-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};