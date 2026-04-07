import { CheckCircle, ImageIcon, AlertCircle } from "lucide-react";

export function FooterStats({ filteredCount, totalCount, searchTerm, stats }) {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Catalog Overview</h3>
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-purple-700">{filteredCount}</span> of{" "}
            <span className="font-bold text-gray-800">{totalCount}</span> SKUs
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">{stats.complete} Complete</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <ImageIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">{stats.withImages} With Images</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">{stats.withoutNames} Unnamed</span>
          </div>
        </div>
      </div>
    </div>
  );
}