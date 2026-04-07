// components/bulk-import/ImportResults.jsx
import { FileText, CheckCircle, AlertTriangle, X, AlertCircle } from "lucide-react";
import { ResultStat } from "./ResultStat";

export const ImportResults = ({ result, onViewSkus }) => {
  if (!result) return null;

  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Import Results</h3>
            <p className="text-sm text-gray-500">SKU import summary</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <ResultStat 
            label="Total Rows" 
            value={result.total_rows} 
            color="blue"
            icon={<FileText className="h-4 w-4" />}
          />
          <ResultStat 
            label="Created" 
            value={result.created} 
            color="green"
            icon={<CheckCircle className="h-4 w-4" />}
          />
          <ResultStat 
            label="Skipped" 
            value={result.skipped} 
            color="amber"
            icon={<AlertTriangle className="h-4 w-4" />}
          />
          <ResultStat 
            label="Failed" 
            value={result.failed} 
            color="red"
            icon={<X className="h-4 w-4" />}
          />
        </div>

        {result.errors?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-gray-200 bg-red-50">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">Error Details</h4>
                  <p className="text-sm text-gray-500">{result.errors.length} issue(s) found</p>
                </div>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
              {result.errors.map((e, i) => (
                <div key={i} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-red-50 rounded-lg flex-shrink-0">
                      <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">
                        {e.row?.sku || e.row?.['SKU'] || `Row ${i + 1}`}
                      </p>
                      <p className="text-red-600 text-sm mt-1 break-words">
                        {e.error || "Unknown error"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.created > 0 && (
          <div className="p-5 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-green-800 mb-1">
                  Successfully imported {result.created} SKU{result.created !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-green-700">
                  All imported SKUs are now available in your inventory.
                </p>
              </div>
              <button
                onClick={onViewSkus}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm"
              >
                View SKUs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};