import { BarChart, RefreshCw, Download, Printer } from "lucide-react";

export function ReportHeader({ onRefresh, onExport, onPrint, statsLength, shopDomain }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-md">
              <BarChart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Packing Performance
              </h1>
              <p className="text-gray-600 mt-1">Real-time scanning statistics and agent performance</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRefresh}
            className="group px-5 py-3 bg-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 hover:border-blue-300"
          >
            <RefreshCw className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-all" />
            <span className="text-gray-700 group-hover:text-blue-700">Refresh</span>
          </button>
          
          <button
            onClick={onExport}
            disabled={statsLength === 0}
            className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          
          <button
            onClick={onPrint}
            className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}