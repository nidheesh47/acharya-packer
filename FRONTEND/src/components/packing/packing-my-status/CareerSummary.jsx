import { Trophy, Target } from "lucide-react";

export function CareerSummary({ overall, overallPerformance }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg">
          <Trophy className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Career Summary</h3>
          <p className="text-sm text-gray-500">Your complete packing journey</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Scans</p>
            <p className="text-2xl font-bold text-blue-600">{overall?.total_scans?.toLocaleString() || 0}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-emerald-600">{overall?.total_orders?.toLocaleString() || 0}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700">Daily Average</p>
            <Target className="h-4 w-4 text-gray-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Scans per day</span>
              <span className="font-medium text-gray-800">
                {Math.round((overall?.total_scans || 0) / 30) || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Orders per day</span>
              <span className="font-medium text-gray-800">
                {Math.round((overall?.total_orders || 0) / 30) || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Overall Efficiency</span>
              <span className={`font-medium ${overallPerformance.efficiency > 80 ? 'text-emerald-600' : overallPerformance.efficiency > 60 ? 'text-amber-600' : 'text-red-600'}`}>
                {overallPerformance.efficiency || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}