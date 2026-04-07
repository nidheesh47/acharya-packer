import { Package, Grid, List, RefreshCw } from "lucide-react";

export function Header({ viewMode, onViewModeChange, onRefresh }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-md">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                SKU Intelligence
              </h1>
              <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRefresh}
            className="group px-5 py-3 bg-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 hover:border-purple-300"
          >
            <RefreshCw className="h-4 w-4 text-gray-600 group-hover:text-purple-600 transition-all" />
            <span className="text-gray-700 group-hover:text-purple-700">Refresh</span>
          </button>
          
          <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                viewMode === "grid" 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span className="text-sm">Grid</span>
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                viewMode === "list" 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
              <span className="text-sm">List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}