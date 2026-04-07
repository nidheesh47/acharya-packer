import { FileText, Download, ExternalLink, Check, Info } from "lucide-react";

export function TemplateCard({ templateUrl }) {
  const requiredColumns = ['order_name', 'sku', 'quantity', 'email'];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">File Template</h3>
            <p className="text-xs text-gray-500">Download and follow format</p>
          </div>
        </div>

        <a
          href={templateUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-3 w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Download className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Download Template</p>
              <p className="text-xs text-gray-500">Google Sheets format</p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </a>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-2 mb-4">
            <Info className="h-4 w-4 text-amber-500 mt-0.5" />
            <p className="text-sm text-gray-600">
              Multiple rows can belong to the same order. Each row represents an item in an order.
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-800 mb-2">Supported formats:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">.csv</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">.xls</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">.xlsx</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-800 mb-2">Required columns:</p>
            <div className="space-y-1.5">
              {requiredColumns.map((col) => (
                <div key={col} className="flex items-center gap-2 text-sm">
                  <Check className="h-3 w-3 text-green-500" />
                  <code className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">{col}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}