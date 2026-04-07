import { Sparkles } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center w-80">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
              <Sparkles className="h-10 w-10 text-white animate-spin" />
            </div>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Loading Dashboard
          </h3>
          <p className="text-sm text-gray-500">Analyzing data...</p>
        </div>
      </div>
    </div>
  );
}