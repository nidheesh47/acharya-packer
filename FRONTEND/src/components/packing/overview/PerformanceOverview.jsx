import { BarChart3, Scan, CheckCircle, Layers } from "lucide-react";

export function PerformanceOverview({ activeStats, activePerformance }) {
  const metrics = [
    { 
      label: "Scanning Progress", 
      value: activeStats?.total_scans || 0, 
      target: 200, 
      color: "from-blue-500 to-cyan-500", 
      icon: Scan 
    },
    { 
      label: "Order Completion", 
      value: activeStats?.total_orders || 0, 
      target: 50, 
      color: "from-emerald-500 to-green-500", 
      icon: CheckCircle 
    },
    { 
      label: "SKU Variety", 
      value: activePerformance.uniqueSkus || 0, 
      target: 30, 
      color: "from-purple-500 to-pink-500", 
      icon: Layers 
    }
  ];

  const overallProgress = Math.round(
    ((activeStats?.total_scans || 0) / 200 + 
     (activeStats?.total_orders || 0) / 50 + 
     (activePerformance.uniqueSkus || 0) / 30) / 3 * 100
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6 w-full">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl">
          <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Performance Overview</h3>
          <p className="text-xs sm:text-sm text-gray-500">Real-time progress tracking</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 w-full">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const percentage = Math.min((metric.value / metric.target) * 100, 100);
          return (
            <div key={idx} className="w-full">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{metric.label}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 flex-shrink-0 ml-2">{metric.value}/{metric.target}</span>
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${metric.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs sm:text-sm font-medium text-gray-700">Overall Progress</span>
          <div className="text-right">
            <div className="text-base sm:text-lg font-bold text-blue-600">{overallProgress}%</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}