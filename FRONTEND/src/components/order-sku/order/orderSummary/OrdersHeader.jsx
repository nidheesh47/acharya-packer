import { RefreshCw, Download, Maximize2, Minimize2, ShoppingBag } from 'lucide-react';

export default function OrdersHeader({ isFullScreen, setIsFullScreen, fetchOrders, handleExport }) {
  const token = localStorage.getItem("auth_token");

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="flex-1">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-3">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl">
              <ShoppingBag className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                Orders Dashboard
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-0.5 sm:mt-1">
                Manage, track, and audit all customer orders
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => fetchOrders(token)}
            className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg sm:rounded-xl font-semibold hover:from-slate-800 hover:to-slate-900 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Refresh</span>
            <span className="sm:hidden">Refresh</span>
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="px-3 py-2 sm:px-5 sm:py-3 bg-slate-200 text-slate-700 rounded-lg sm:rounded-xl font-semibold hover:bg-slate-300 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            {isFullScreen ? (
              <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            )}
            <span className="hidden sm:inline">{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</span>
            <span className="sm:hidden">{isFullScreen ? "Exit" : "Full"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}