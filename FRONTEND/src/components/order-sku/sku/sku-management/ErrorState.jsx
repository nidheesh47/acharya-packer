import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorState({ error, onRetry }) {
  return (
    <div className="mb-8">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-800">Failed to Load SKUs</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition-all flex items-center gap-1.5"
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