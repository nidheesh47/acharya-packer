import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function TodayVsOverall({ today, overall, todayPerformance, overallPerformance }) {
  const comparisons = [
    { label: "Total Scans", today: today?.total_scans || 0, overall: overall?.total_scans || 0 },
    { label: "Orders", today: today?.total_orders || 0, overall: overall?.total_orders || 0 },
    { label: "Unique SKUs", today: todayPerformance.uniqueSkus || 0, overall: overallPerformance.uniqueSkus || 0 },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-200 w-full">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Today vs Overall</h3>
      </div>
      
      <div className="space-y-2 sm:space-y-3 w-full">
        {comparisons.map((item, idx) => {
          const avgDaily = Math.round(item.overall / 30);
          const diff = item.today - avgDaily;
          const isPositive = diff > 0;
          
          return (
            <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-white/60 rounded-lg sm:rounded-xl w-full">
              <span className="text-xs sm:text-sm text-gray-600 truncate">{item.label}</span>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
                <span className="text-xs sm:text-sm font-bold text-gray-900">{item.today}</span>
                <div className={`flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <ArrowDownRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                  {Math.abs(diff)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}