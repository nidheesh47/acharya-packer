// components/sku-summary/Footer.jsx
import { Eye, TrendingUp } from "lucide-react";

export const Footer = ({ filteredCount, stats }) => {
  return (
    <div className="mt-8 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-500" />
            <span>Showing <span className="font-semibold text-gray-800">{filteredCount}</span> SKUs</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span>Overall completion: <span className="font-semibold text-gray-800">{stats.completion}%</span></span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-gray-600">Complete (80-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-600">In Progress (50-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <span className="text-xs text-gray-600">Needs Attention (0-49%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};