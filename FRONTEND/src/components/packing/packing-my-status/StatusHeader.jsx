import { Package, Calendar, Clock, RefreshCw } from "lucide-react";

export function StatusHeader({ formattedDate, lastUpdated, onRefresh }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-md">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                My Packing Performance
              </h1>
              <p className="text-gray-600 mt-1">Track your daily progress and achievements</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">{formattedDate}</span>
            </div>
            {lastUpdated && (
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-gray-600">Updated: {lastUpdated}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRefresh}
            className="group px-5 py-3 bg-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 hover:border-blue-300"
          >
            <RefreshCw className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-all" />
            <span className="text-gray-700 group-hover:text-blue-700">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}