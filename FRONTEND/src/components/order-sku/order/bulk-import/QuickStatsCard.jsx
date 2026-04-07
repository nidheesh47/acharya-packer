import { Zap } from "lucide-react";

export function QuickStatsCard() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Import Speed</p>
          <p className="text-lg font-bold text-gray-800">Up to 1000 rows</p>
          <p className="text-xs text-gray-500">per batch</p>
        </div>
      </div>
    </div>
  );
}