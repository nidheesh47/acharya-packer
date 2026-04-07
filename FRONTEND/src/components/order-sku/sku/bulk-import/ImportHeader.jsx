// components/bulk-import/ImportHeader.jsx
import { UploadCloud, ShieldCheck, Clock, PackageOpen, FilePlus, Package } from "lucide-react"; // Add FilePlus and Package

export const ImportHeader = ({ onNewImport, onViewSkus, showNewImport }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-md">
              <UploadCloud className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Bulk SKU Import
              </h1>
              <p className="text-gray-600 mt-1">
                Import multiple SKUs including bundles using CSV or Excel files
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">Secure upload</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">Real-time processing</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <PackageOpen className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-gray-600">Bundle support</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {showNewImport && (
            <button
              onClick={onNewImport}
              className="px-5 py-3 bg-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 hover:border-purple-300"
            >
              <FilePlus className="h-4 w-4 text-purple-600" />
              <span className="text-gray-700">New Import</span>
            </button>
          )}
          <button
            onClick={onViewSkus}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md flex items-center gap-2"
          >
            <Package className="h-4 w-4" />
            View SKUs
          </button>
        </div>
      </div>
    </div>
  );
};