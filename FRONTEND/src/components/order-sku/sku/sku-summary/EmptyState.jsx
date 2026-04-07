// components/sku-summary/EmptyState.jsx
import { Search } from "lucide-react";

export const EmptyState = ({ search, onClearSearch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 bg-gray-100 rounded-2xl mb-4">
          <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No SKUs Found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
        {search && (
          <button
            onClick={onClearSearch}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            Clear search →
          </button>
        )}
      </div>
    </div>
  );
};