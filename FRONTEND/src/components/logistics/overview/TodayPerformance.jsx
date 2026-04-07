import { Activity, CheckCircle, Clock, XCircle, Layers, Rocket } from "lucide-react";
import { MetricBox } from "./MetricBox";

export function TodayPerformance({ today, scanRateData }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Today's Performance</h3>
              <p className="text-xs text-gray-500">{today.date}</p>
            </div>
          </div>
          <div className="px-2 py-1 bg-green-50 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-medium text-green-600">Live</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <MetricBox 
            label="Completed" 
            value={today.orders.scanned}
            icon={<CheckCircle className="h-4 w-4" />}
            color="green"
          />
          <MetricBox 
            label="In Progress" 
            value={today.orders.pending}
            icon={<Clock className="h-4 w-4" />}
            color="amber"
          />
          <MetricBox 
            label="Cancelled" 
            value={today.orders.cancelled}
            icon={<XCircle className="h-4 w-4" />}
            color="red"
          />
          <MetricBox 
            label="Total SKU" 
            value={today.sku.total_ordered_quantity}
            icon={<Layers className="h-4 w-4" />}
            color="purple"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">SKU Performance</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Ordered Quantity</div>
                <div className="text-2xl font-bold text-gray-900">{today.sku.total_ordered_quantity}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Scanned Quantity</div>
                <div className="text-2xl font-bold text-green-600">{today.sku.total_scanned_quantity}</div>
              </div>
            </div>
            {today.sku.top_ordered_sku && (
              <div className="bg-white/60 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">🏆 Top Performing SKU</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-gray-900">{today.sku.top_ordered_sku.sku}</span>
                  <span className="text-sm font-bold text-blue-600">{today.sku.top_ordered_sku.quantity} units</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Scan Completion</span>
              <span className="text-sm font-bold text-purple-600">{scanRateData?.today || 0}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${scanRateData?.today || 0}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Completion</span>
                <span className="font-medium text-gray-700">
                  {today.orders.total > 0 ? Math.round((today.orders.scanned / today.orders.total) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Processing Rate</span>
                <span className="font-medium text-gray-700">
                  {today.sku.total_ordered_quantity > 0 ? Math.round((today.sku.total_scanned_quantity / today.sku.total_ordered_quantity) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}