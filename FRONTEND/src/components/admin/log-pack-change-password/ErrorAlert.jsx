// components/change-password/ErrorAlert.jsx
import { AlertCircle, X } from "lucide-react";

export const ErrorAlert = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg sm:rounded-r-xl">
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-800 text-sm sm:text-base">Security Alert</p>
            <p className="text-red-700 text-xs sm:text-sm mt-1">{error}</p>
          </div>
          <button onClick={onClear} className="text-red-400 hover:text-red-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};