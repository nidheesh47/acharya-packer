import { Search, Eye } from "lucide-react";

export function SKUSearchBar({ 
  searchTerm, onSearchChange, 
  skuFilter, onFilterChange,
  showPreview, onTogglePreview 
}) {
  return (
    <div className="bg-indigo-50 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search SKU by code or product name..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={skuFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All SKUs</option>
          <option value="with_images">With Images</option>
          <option value="no_images">No Images</option>
          <option value="recent">Recent (30 days)</option>
        </select>
        <button
          type="button"
          onClick={onTogglePreview}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          {showPreview ? "Hide" : "Browse"} Catalog
        </button>
      </div>
    </div>
  );
}