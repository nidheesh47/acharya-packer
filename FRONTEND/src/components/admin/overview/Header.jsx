import { Sparkles, RefreshCw } from "lucide-react";

export function Header({ lastRefresh, onRefresh }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Analytics Hub
              </h1>
              <p className="text-xs text-gray-500">Real-time performance insights</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onRefresh}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 text-gray-500" />
            </button>
            <div className="bg-gray-50 rounded-xl px-3 py-1.5 border border-gray-100">
              <div className="text-[10px] text-gray-400">Last update</div>
              <div className="text-xs font-medium text-gray-700">
                {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}