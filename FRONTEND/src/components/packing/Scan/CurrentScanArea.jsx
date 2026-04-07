import { ScanInput } from "./ScanInput";
import { NextItemDisplay } from "./NextItemDisplay";
import { StatusMessage } from "./StatusMessage";

export function CurrentScanArea({
  order,
  inputRef,
  input,
  onInputChange,
  scanMode,
  nextItemToScan,
  loading,
  message,
  error,
  theme,
  getCompletionPercentage,
  onManualInput,
  onScan
}) {
  return (
    <div className={`${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} overflow-hidden`}>
      <div className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-500 p-3 sm:p-4`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
          <h2 className="text-white font-bold text-sm sm:text-base break-words">
            Order: {order?.order_name}
          </h2>
          <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-lg">
            <span className="text-white font-bold text-xs sm:text-sm">
              Progress: {getCompletionPercentage()}%
            </span>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mb-4">
          <div 
            className="bg-yellow-300 h-2 rounded-full" 
            style={{ width: `${getCompletionPercentage()}%` }} 
          />
        </div>
        <ScanInput
          inputRef={inputRef}
          input={input}
          onInputChange={onInputChange}
          scanMode={scanMode}
          nextItemToScan={nextItemToScan}
          loading={loading}
          order={order}
          onManualInput={onManualInput}
          onScan={onScan}
        />
      </div>
      <div className="p-2 sm:p-2 md:p-2">
        <NextItemDisplay
          nextItemToScan={nextItemToScan}
          scanMode={scanMode}
          theme={theme}
        />
        <StatusMessage message={message} error={error} theme={theme} />
      </div>
    </div>
  );
}