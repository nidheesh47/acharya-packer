// components/sku-summary/SearchControls.jsx
import { Search, X, Filter, List, Grid } from "lucide-react";

export const SearchControls = ({ 
  search, 
  onSearchChange, 
  filteredCount, 
  totalCount,
  viewMode,
  onViewModeChange,
  isMobile,
  sortConfig
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              placeholder="Search by SKU code..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {search && (
              <button 
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center group"
              >
                <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 rounded-lg">
            <Filter className="h-4 w-4 text-indigo-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-indigo-600">{filteredCount}</span> of{" "}
              <span className="font-semibold text-gray-700">{totalCount}</span> SKUs
            </span>
          </div>
          
          {!isMobile && (
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange("table")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  viewMode === "table" 
                    ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <List className="h-4 w-4" />
                Table
              </button>
              <button
                onClick={() => onViewModeChange("grid")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  viewMode === "grid" 
                    ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Grid className="h-4 w-4" />
                Grid
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-500">
        <span className="font-medium">Sorted by:</span>{" "}
        <span className="text-indigo-600 font-semibold">
          {sortConfig.key.charAt(0).toUpperCase() + sortConfig.key.slice(1)}
        </span>{" "}
        <span className="text-gray-400">({sortConfig.direction})</span>
      </div>
    </div>
  );
};