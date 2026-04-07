import { AlertTriangle, RefreshCw } from "lucide-react";

export function ErrorState({ error, onRetry }) {
  return (
    <div className="mb-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg sm:rounded-r-xl">
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-800 text-sm sm:text-base">Error loading users</p>
            <p className="text-red-700 text-xs sm:text-sm mt-1">{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-200 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}