import { Barcode, Loader2 } from "lucide-react";

export function EmptyState({ 
  inputRef, 
  input, 
  onInputChange, 
  loading, 
  error, 
  onScan, 
  theme 
}) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-2xl w-full px-2 sm:px-4">
        <div className={`${theme.bgCard} rounded-2xl shadow-2xl border ${theme.borderColor} p-4 sm:p-6 md:p-8`}>
          <div className="text-center mb-4 sm:mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-${theme.accentColor}-400 to-${theme.accentColor}-500 rounded-full mb-3 sm:mb-4`}>
              <Barcode className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold ${theme.textColor}`}>Ready to Scan</h2>
            <p className={`text-xs sm:text-sm ${theme.textMuted}`}>Scan an order barcode to begin packing</p>
          </div>
          <div className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Scan order barcode here..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-24 rounded-xl text-sm sm:text-base border-2 border-white/50 bg-white/95"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button 
                onClick={onScan} 
                disabled={loading || !input.trim()} 
                className={`px-3 sm:px-4 py-1.5 bg-gradient-to-r from-${theme.accentColor}-300 to-${theme.accentColor}-600 ${theme.textColor} rounded-lg text-xs sm:text-sm disabled:opacity-50`}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Scan"}
              </button>
            </div>
          </div>
          {error && (
            <div className={`mt-4 p-2 sm:p-3 rounded-xl text-xs sm:text-sm ${theme.errorBg} ${theme.errorText}`}>
              <AlertCircle className="h-4 w-4 inline mr-1" />
              <span className="break-words">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}