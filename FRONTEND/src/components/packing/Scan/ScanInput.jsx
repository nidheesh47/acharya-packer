import { Loader2 } from "lucide-react";

export function ScanInput({ 
  inputRef, 
  input, 
  onInputChange, 
  scanMode, 
  nextItemToScan, 
  loading, 
  order,
  onManualInput, 
  onScan 
}) {
  const getPlaceholder = () => {
    if (scanMode === "order") return "Scan order barcode...";
    if (scanMode === "tracking") return "Scan tracking label...";
    if (nextItemToScan) return `Scan: ${nextItemToScan.sku}`;
    return "Scan SKU...";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim() && !loading && order?.scan_status !== "scanned") {
      onScan();
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={getPlaceholder()}
        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-28 rounded-xl text-sm sm:text-base border-2 border-white/50 bg-white/95 focus:outline-none focus:ring-2 focus:ring-purple-500"
        disabled={loading || order?.scan_status === "scanned"}
        autoFocus
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
        <button 
          onClick={onManualInput} 
          className="px-2 sm:px-3 py-1 bg-white/20 text-white rounded-lg text-xs sm:text-sm hover:bg-white/30 transition-colors"
        >
          Manual
        </button>
        <button 
          onClick={onScan} 
          disabled={loading || !input.trim()} 
          className="px-3 sm:px-4 py-1 bg-purple-600 text-white rounded-lg text-xs sm:text-sm hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Scan"}
        </button>
      </div>
    </div>
  );
}