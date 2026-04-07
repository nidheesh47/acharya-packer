import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function ComparisonItem({ label, today, yesterday }) {
  const change = ((today - yesterday) / (yesterday || 1)) * 100;
  const isPositive = change >= 0;
  const absChange = Math.abs(change).toFixed(1);
  
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <div className="text-sm font-medium text-gray-600">{label}</div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900">{today}</div>
          <div className="text-[10px] text-gray-400">Today</div>
        </div>
        <div className="text-gray-300">→</div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-600">{yesterday}</div>
          <div className="text-[10px] text-gray-400">Yesterday</div>
        </div>
        <div className={`flex items-center gap-0.5 text-xs font-semibold min-w-[50px] ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {absChange}%
        </div>
      </div>
    </div>
  );
}