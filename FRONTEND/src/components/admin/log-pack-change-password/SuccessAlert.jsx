// components/change-password/SuccessAlert.jsx
import { CheckCircle, X } from "lucide-react";

export const SuccessAlert = ({ success, onClear }) => {
  if (!success) return null;

  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-r-lg sm:rounded-r-xl">
        <div className="flex items-start gap-2 sm:gap-3">
          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-green-800 text-sm sm:text-base">Password Updated</p>
            <p className="text-green-700 text-xs sm:text-sm mt-1">{success}</p>
          </div>
          <button onClick={onClear} className="text-green-400 hover:text-green-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};