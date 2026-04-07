import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({ title, value, icon, gradient, bgGradient, textColor, trend, trendLabel }) {
  const TrendIcon = trend >= 0 ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend >= 0 ? "text-green-600" : "text-red-600";
  
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-800">
            {value}
          </p>
        </div>
        <div className={`p-2.5 rounded-xl bg-gradient-to-r ${gradient} shadow-sm`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
      
      {trend !== undefined && trend !== null && (
        <div className="flex items-center justify-between mt-2">
          <div className={`flex items-center gap-1 text-xs ${trendColor} bg-white px-2 py-1 rounded-full`}>
            <TrendIcon className="h-3 w-3" />
            <span>{Math.abs(trend)}%</span>
          </div>
          {trendLabel && (
            <span className="text-xs text-gray-500">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}