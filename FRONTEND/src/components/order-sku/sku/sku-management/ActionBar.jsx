import { Search, Upload, Plus, Download } from "lucide-react";
import { Link } from "react-router";

export function ActionBar({ searchTerm, onSearchChange, onExport }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by SKU code or product name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/sku/bulk-import"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
          >
            <Upload className="h-5 w-5" />
            Bulk Import
          </Link>
          
          <Link
            to="/create/sku"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
          >
            <Plus className="h-5 w-5" />
            Add SKU
          </Link>

          <button
            onClick={onExport}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-md"
          >
            <Download className="h-5 w-5" />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}