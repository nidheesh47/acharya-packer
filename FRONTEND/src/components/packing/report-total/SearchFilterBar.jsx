import { Search, Filter, ChevronRight, X } from "lucide-react";

export function SearchFilterBar({ 
  searchTerm, onSearchChange,
  filterRole, onFilterChange,
  uniqueRoles,
  onClearFilters 
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
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => onFilterChange(e.target.value)}
              className="pl-10 pr-8 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90" />
          </div>
        </div>
      </div>

      {(searchTerm || filterRole !== "all") && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {filterRole !== "all" && (
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full flex items-center gap-2 border border-blue-200">
              Role: {filterRole}
              <button onClick={() => onFilterChange("all")} className="hover:bg-blue-200 rounded-full p-0.5">✕</button>
            </span>
          )}
          {searchTerm && (
            <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full flex items-center gap-2 border border-purple-200">
              Search: {searchTerm}
              <button onClick={() => onSearchChange("")} className="hover:bg-purple-200 rounded-full p-0.5">✕</button>
            </span>
          )}
          <button
            onClick={onClearFilters}
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}