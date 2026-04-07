import { Link } from "react-router";
import { ArrowLeft, Package, PackageOpen, X, ShieldCheck } from "lucide-react";

export function CreateSKUHeader({ skuType, onClearForm }) {
  return (
    <div className="mb-8">
      <Link
        to="/all/sku/list"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 bg-white px-4 py-2 rounded-lg transition-all duration-200 mb-6 group hover:shadow-sm"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to SKU Catalog
      </Link>
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-md">
            {skuType === 'bundle' ? (
              <PackageOpen className="h-8 w-8 text-white" />
            ) : (
              <Package className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Create New {skuType === 'bundle' ? 'Bundle' : 'SKU'}
            </h1>
            <p className="text-gray-600 mt-1">
              {skuType === 'bundle' 
                ? 'Create a product bundle - missing components will be auto-created'
                : 'Add new products to your inventory catalog'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onClearForm}
            className="px-5 py-3 bg-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 hover:border-purple-300"
          >
            <X className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700">Clear Form</span>
          </button>
          <div className="px-4 py-3 bg-purple-100 text-purple-700 text-sm font-semibold rounded-lg border border-purple-200 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            SHOP-SCOPED
          </div>
        </div>
      </div>
    </div>
  );
}