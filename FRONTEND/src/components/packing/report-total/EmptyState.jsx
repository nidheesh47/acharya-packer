import { Users } from "lucide-react";

export function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Users className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {hasFilters ? "No Matching Agents Found" : "No Packing Data Available"}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {hasFilters 
          ? "Try adjusting your search or filter criteria to find what you're looking for."
          : "Packing statistics will appear once agents start scanning items."}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-6 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}