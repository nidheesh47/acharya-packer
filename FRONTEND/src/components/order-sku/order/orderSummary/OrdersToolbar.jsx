import React from "react";
import { Grid, Table } from "lucide-react";

export default function OrdersToolbar({
  viewMode,
  setViewMode,
  totalItems,
  currentStart,
  currentEnd,
  selectedCount,
}) {
  return (
    <div className="mb-3 sm:mb-4 flex justify-between items-center">
      <div className="text-xs sm:text-sm text-slate-600">
        Showing {currentStart}-{currentEnd} of {totalItems} orders
        {selectedCount > 0 && <span className="ml-2 sm:ml-4 font-medium text-indigo-700">({selectedCount} selected)</span>}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-xs sm:text-sm text-slate-600 mr-1 sm:mr-2 hidden sm:inline">View:</span>
        <button
          onClick={() => setViewMode("grid")}
          className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${
            viewMode === "grid" 
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Grid className="h-3 w-3 sm:h-4 sm:w-4 inline mr-0 sm:mr-1" />
          <span className="hidden sm:inline">Grid</span>
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${
            viewMode === "table" 
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <Table className="h-3 w-3 sm:h-4 sm:w-4 inline mr-0 sm:mr-1" />
          <span className="hidden sm:inline">Table</span>
        </button>
      </div>
    </div>
  );
}