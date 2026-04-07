import { Package } from "lucide-react";

export function LoadingState({ mounted }) {
  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 flex items-center justify-center p-4 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center animate-pulse">
              <Package className="h-10 w-10 text-white animate-spin" />
            </div>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Loading Dashboard
          </h3>
          <p className="text-sm text-gray-500">Preparing your performance analytics...</p>
        </div>
      </div>
    </div>
  );
}