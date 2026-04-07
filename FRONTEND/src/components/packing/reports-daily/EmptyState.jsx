import { BarChart } from "lucide-react";

export function EmptyState({ hasSearch, onClearSearch }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <BarChart className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {hasSearch ? "No matching agents found" : "No scanning data recorded for today"}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {hasSearch 
          ? "Try adjusting your search terms to find the agent you're looking for."
          : "Start scanning orders to see performance statistics here."}
      </p>
      {hasSearch && (
        <button
          onClick={onClearSearch}
          className="mt-6 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}