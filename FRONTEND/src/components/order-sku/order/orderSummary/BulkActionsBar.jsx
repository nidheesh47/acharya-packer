import { Check, Zap, Trash2, Loader2 } from 'lucide-react';

export default function BulkActionsBar({ 
  selectedCount, 
  setSelectedOrders, 
  setShowBulkOps, 
  setShowBulkDeleteConfirm,
  bulkActionLoading 
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center">
          <div className="bg-white/20 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl mr-2 sm:mr-3 backdrop-blur-sm">
            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base">
              {selectedCount} orders selected
            </h3>
            <p className="text-xs text-indigo-100 hidden sm:block">
              Choose actions to perform on selected orders
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowBulkOps(true)}
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg sm:rounded-xl transition-colors backdrop-blur-sm"
            disabled={bulkActionLoading}
          >
            {bulkActionLoading ? (
              <>
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                Bulk Actions
              </>
            )}
          </button>

          <button
            onClick={() => setSelectedOrders(new Set())}
            className="px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-indigo-700 bg-white rounded-lg sm:rounded-xl hover:bg-indigo-50 transition-colors"
            disabled={bulkActionLoading}
          >
            Clear
          </button>

          <button
            onClick={() => setShowBulkDeleteConfirm(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg sm:rounded-xl hover:from-rose-600 hover:to-rose-700 transition-colors inline-flex items-center shadow-sm"
            disabled={bulkActionLoading}
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
            Delete ({selectedCount})
          </button>
        </div>
      </div>
    </div>
  );
}