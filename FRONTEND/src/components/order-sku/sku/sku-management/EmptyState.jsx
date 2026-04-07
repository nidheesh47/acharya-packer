import { Package, Plus, Upload } from "lucide-react";
import { Link } from "react-router";

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6">
        <Package className="h-12 w-12 text-purple-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">No SKUs Found</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        {window.location.search.includes('search') 
          ? "No SKUs match your search criteria. Try different keywords."
          : "You haven't added any SKUs yet. Start building your product catalog."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/create/sku"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
        >
          <Plus className="h-5 w-5" />
          Add First SKU
        </Link>
        <Link
          to="/sku/bulk-import"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-md"
        >
          <Upload className="h-5 w-5" />
          Bulk Import
        </Link>
      </div>
    </div>
  );
}