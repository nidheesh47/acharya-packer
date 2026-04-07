import { Package, Clock, Shield, RefreshCw } from "lucide-react";

export function Header({ admin, lastUpdated, isRefreshing, onRefresh }) {
  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl">
                <Package className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
                Packing Dashboard
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-0.5 sm:mt-1">Real-time performance monitoring</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm border border-white/50">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700 truncate">
                Last updated: {lastUpdated || "Just now"}
              </span>
            </div>
            {admin && (
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-sm border border-white/50">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 capitalize truncate">{admin.role} • {admin.name}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="group px-3 py-2 sm:px-5 sm:py-3 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-xl transition-all flex items-center gap-1.5 sm:gap-2 border border-gray-200 hover:border-blue-300 text-sm sm:text-base whitespace-nowrap"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 group-hover:text-blue-600 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-all`} />
            <span className="text-gray-700 group-hover:text-blue-700">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}