import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="mb-6 bg-gradient-to-r from-rose-50 to-red-100 border-l-4 border-rose-500 p-4 sm:p-5 rounded-r-xl shadow-sm">
      <div className="flex items-start">
        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-rose-800 text-sm sm:text-base">Error loading orders</p>
          <p className="text-rose-700 text-xs sm:text-sm mt-1">{error}</p>
          <button 
            onClick={onRetry} 
            className="mt-2 sm:mt-3 text-xs sm:text-sm text-rose-600 hover:text-rose-700 font-medium"
          >
            Try again →
          </button>
        </div>
      </div>
    </div>
  );
}