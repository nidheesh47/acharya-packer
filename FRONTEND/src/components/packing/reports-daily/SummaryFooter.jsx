import { Sparkles } from "lucide-react";

export function SummaryFooter({ totalScans, totalOrders, uniqueAgents }) {
  const avgPerOrder = totalOrders > 0 ? (totalScans / totalOrders).toFixed(1) : 0;

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Today's Summary</h3>
            <p className="text-blue-100 text-sm">
              {uniqueAgents} agent{uniqueAgents !== 1 ? 's' : ''} processed {totalOrders} order{totalOrders !== 1 ? 's' : ''} with {totalScans} scan{totalScans !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalScans.toLocaleString()}</div>
            <div className="text-xs text-blue-200">Total Scans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalOrders.toLocaleString()}</div>
            <div className="text-xs text-blue-200">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{uniqueAgents}</div>
            <div className="text-xs text-blue-200">Active Agents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{avgPerOrder}</div>
            <div className="text-xs text-blue-200">Avg/Order</div>
          </div>
        </div>
      </div>
    </div>
  );
}