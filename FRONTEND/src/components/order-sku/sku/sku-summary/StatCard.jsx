// components/sku-summary/StatCard.jsx
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({ label, value, icon, gradient, trend, progress }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} shadow-md`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
      
      {trend === 'up' && (
        <div className="mt-2 flex items-center text-xs">
          <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
          <span className="text-emerald-600 font-medium">Ahead</span>
        </div>
      )}
      {trend === 'down' && (
        <div className="mt-2 flex items-center text-xs">
          <TrendingDown className="h-3 w-3 text-rose-500 mr-1" />
          <span className="text-rose-600 font-medium">Behind</span>
        </div>
      )}
    </div>
  );
};