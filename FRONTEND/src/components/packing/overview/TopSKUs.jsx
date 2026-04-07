import { Package } from "lucide-react";

export function TopSKUs({ activeStats, activePeriod }) {
  const colors = [
    "from-yellow-500 to-amber-500",
    "from-gray-500 to-slate-500",
    "from-orange-500 to-red-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500"
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6 w-full">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg sm:rounded-xl">
          <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            {activePeriod === "today" ? "Today's Top SKUs" : "Top Performing SKUs"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">Most frequently scanned items</p>
        </div>
      </div>

      {activeStats?.sku_stats?.length > 0 ? (
        <div className="space-y-2 sm:space-y-3 w-full">
          {activeStats.sku_stats.slice(0, 5).map((item, idx) => {
            const percentage = Math.min((item.count / (activeStats.sku_stats[0]?.count || 1)) * 100, 100);
            
            return (
              <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-all w-full">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r ${colors[idx]} flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <span className="text-white font-bold text-xs sm:text-sm">#{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono font-bold text-gray-900 text-xs sm:text-sm truncate">{item.sku}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">{item.count} scans</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 ml-2 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-gray-900">{item.count}</span>
                  <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colors[idx]} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 sm:py-8 w-full">
          <Package className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
          <p className="text-sm sm:text-base text-gray-500">No SKU data available</p>
          <p className="text-xs text-gray-400 mt-1">Start scanning to see your top SKUs</p>
        </div>
      )}
    </div>
  );
}