// components/sku-summary/SKUSummaryHeader.jsx
import { Package, Clock, Download, Printer, RefreshCw } from "lucide-react";

export const SKUSummaryHeader = ({ lastUpdated, shopDomain, onRefresh, onExport, onPrint }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-md">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Pick & Pack Summary
              </h1>
              <p className="text-gray-600 mt-1">Real-time inventory tracking & fulfillment analytics</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {lastUpdated && (
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-gray-600">
                  Updated: {lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRefresh}
            className="group px-5 py-3 bg-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 hover:border-indigo-300"
          >
            <RefreshCw className="h-4 w-4 text-gray-600 group-hover:text-indigo-600 transition-all" />
            <span className="text-gray-700 group-hover:text-indigo-700">Refresh</span>
          </button>
          <button
            onClick={onExport}
            className="group px-5 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-white"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onPrint}
            className="group px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-white"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};