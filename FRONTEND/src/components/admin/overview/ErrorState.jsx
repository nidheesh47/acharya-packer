import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorState({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}