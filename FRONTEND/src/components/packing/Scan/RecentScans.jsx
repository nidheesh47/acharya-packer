import { Clock } from "lucide-react";

export function RecentScans({ scanHistory, theme }) {
  if (scanHistory.length === 0) return null;

  return (
    <div className={`mt-4 sm:mt-6 ${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} p-3 sm:p-4`}>
      <h3 className={`font-bold mb-2 sm:mb-3 flex items-center text-sm sm:text-base`}>
        <Clock className="h-4 w-4 mr-1" />
        Recent Scans
      </h3>
      {scanHistory.map((scan, idx) => (
        <div key={idx} className="flex justify-between items-center p-2 border-b last:border-0 flex-wrap gap-2">
          <div>
            <p className="text-xs sm:text-sm font-medium break-words">{scan.orderId}</p>
            <p className="text-[10px] sm:text-xs text-gray-500">{scan.timestamp}</p>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0">
            {scan.items}/{scan.totalItems} items
          </span>
        </div>
      ))}
    </div>
  );
}