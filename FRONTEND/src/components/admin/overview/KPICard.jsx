import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function KPICard({ title, value, change, icon, trend }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl group-hover:scale-110 transition-transform">
          <div className="text-gray-600">{icon}</div>
        </div>
        {change && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${
            change.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {change.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {change.value}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-700 mb-1">{title}</div>
      <div className="text-xs text-gray-400">{trend}</div>
    </div>
  );
}