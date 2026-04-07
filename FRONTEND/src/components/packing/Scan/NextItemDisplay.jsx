import { Package, Check, Loader2 } from "lucide-react";

export function NextItemDisplay({ 
  nextItemToScan, 
  scanMode, 
  theme,
  onScan,
  loading,
  input
}) {
  if (scanMode === "tracking") {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="bg-green-500/20 border-2 border-green-500/30 rounded-xl p-4 sm:p-6 max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold mb-2">All Items Scanned!</h2>
          <p className="text-xs sm:text-sm mb-4">Scan tracking label to complete order.</p>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-[10px] sm:text-xs text-gray-400 mb-1">Tracking Number:</p>
            <code className="text-sm sm:text-base md:text-lg font-bold break-all">
              {nextItemToScan?.tracking_number || "Ready to scan"}
            </code>
          </div>
        </div>
      </div>
    );
  }

  if (!nextItemToScan) {
    return (
      <div className="text-center py-6 sm:py-8">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-3" />
        <h3 className="text-base sm:text-lg font-bold">No Items to Scan</h3>
        <p className="text-xs sm:text-sm text-gray-500">All items scanned successfully</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="bg-white/10 rounded-xl p-1 sm:p-1 flex-1 w-full">
        <code className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono break-all">
          {nextItemToScan.product_name}
        </code>
      </div>
      <div className={`bg-white/10 border-2 ${theme.borderColor} rounded-xl mb-4 overflow-hidden`}>
        <div className="h-48 sm:h-64 md:h-80 lg:h-96 w-full flex items-center justify-center p-4 sm:p-2">
          {nextItemToScan.image_url ? (
            <img 
              src={nextItemToScan.image_url} 
              alt={nextItemToScan.product_name} 
              className="max-h-full max-w-full object-contain" 
            />
          ) : (
            <div className="flex flex-col items-center">
              <Package className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 text-gray-400" />
              <p className="text-xs sm:text-sm text-gray-500 mt-2">No image available</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-3">
        <div className="bg-white/10 rounded-xl p-2 sm:p-3 flex-1 w-full">
          <code className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-mono break-all">
            {nextItemToScan.sku}
          </code>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="bg-white/10 px-3 sm:px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] sm:text-xs text-gray-400 block">Pending</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
              {nextItemToScan.pending_qty || 1}
            </span>
          </div>
          <div className="bg-white/10 px-3 sm:px-4 py-2 rounded-xl text-center">
            <span className="text-[10px] sm:text-xs text-gray-400 block">Total</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold">
              {nextItemToScan.ordered_qty}
            </span>
          </div>
        </div>
      </div>
      {nextItemToScan.is_part_of_bundle && (
        <p className="text-xs sm:text-sm text-purple-400 break-words">
          Part of bundle: {nextItemToScan.bundle_name}
        </p>
      )}
    </div>
  );
}