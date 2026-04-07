import { AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

export function ErrorState({ error, onRetry, mounted }) {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <AlertCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Data</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-1 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}