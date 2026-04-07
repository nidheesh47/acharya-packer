import { Search, Grid, List, X } from "lucide-react";

export function SearchFilterBar({ 
  searchTerm, onSearchChange, 
  viewMode, onViewModeChange,
  onClearSearch 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by agent name or ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                viewMode === "grid" 
                  ? "bg-white text-purple-700 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Grid className="h-4 w-4" />
              Grid
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                viewMode === "list" 
                  ? "bg-white text-purple-700 shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>
        </div>
      </div>

      {searchTerm && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Searching for:</span>
          <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full flex items-center gap-2 border border-purple-200">
            {searchTerm}
            <button onClick={onClearSearch} className="hover:bg-purple-200 rounded-full p-0.5">
              <X className="h-3 w-3" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}