import { Package, BarChart3, Percent, Zap } from "lucide-react";

export function QuickStats({ activePerformance }) {
  const stats = [
    { label: "Total SKUs", value: activePerformance.totalScans || 0, icon: Package },
    { 
      label: "Avg Scans/SKU", 
      value: activePerformance.totalScans && activePerformance.uniqueSkus 
        ? Math.round(activePerformance.totalScans / activePerformance.uniqueSkus) 
        : 0, 
      icon: BarChart3 
    },
    { label: "Completion Rate", value: `${activePerformance.efficiency || 0}%`, icon: Percent },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6 w-full">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg sm:rounded-xl">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Quick Stats</h3>
      </div>
      
      <div className="space-y-2 sm:space-y-3 w-full">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl w-full">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 truncate">{stat.label}</span>
              </div>
              <span className="text-sm sm:text-base font-bold text-gray-900 flex-shrink-0 ml-2">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}