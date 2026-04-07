// components/bulk-import/SuccessAlert.jsx
import { CheckCircle, X } from "lucide-react";

export const SuccessAlert = ({ success, onClear }) => {
  if (!success) return null;

  return (
    <div className="mb-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-green-800">Import Successful!</h4>
            <p className="text-green-700 text-sm mt-1">{success}</p>
          </div>
          <button onClick={onClear} className="text-green-400 hover:text-green-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};