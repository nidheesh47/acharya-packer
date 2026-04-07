import { ChevronRight, Upload } from "lucide-react";
import { QuickStatsCard } from "./QuickStatsCard";

export function BulkImportHeader({ onBack }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm mb-3">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-1"
            >
              Back
            </button>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span className="text-gray-700 font-medium">Bulk Import</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-md">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Bulk Order Import
              </h1>
              <p className="text-gray-600 mt-1">Import multiple orders at once using CSV or Excel files</p>
            </div>
          </div>
        </div>

        <QuickStatsCard />
      </div>
    </div>
  );
}