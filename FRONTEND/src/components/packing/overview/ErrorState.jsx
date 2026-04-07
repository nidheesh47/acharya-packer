import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorState({ error, isRefreshing, onRetry, mounted }) {
  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 flex items-center justify-center p-4 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-center border border-white/20">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <AlertCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-500 mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Try Again
        </button>
      </div>
    </div>
  );
}