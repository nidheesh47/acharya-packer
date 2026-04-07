import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorState({ error, onRetry, mounted }) {
  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <AlertCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Data</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}