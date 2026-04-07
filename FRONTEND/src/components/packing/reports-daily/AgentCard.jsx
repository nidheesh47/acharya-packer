import { User, Calendar, Shield, Package, ChevronRight, ChevronDown } from "lucide-react";

export function AgentCard({ agent, isExpanded, onToggle }) {
  const avgScansPerOrder = agent.total_orders > 0 
    ? (agent.total_scans / agent.total_orders).toFixed(1) 
    : 0;
  const skuStats = Array.isArray(agent.sku_stats) ? agent.sku_stats : [];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{agent.agent_name || "Unknown Agent"}</h3>
                <p className="text-sm text-gray-500">ID: {agent.agent_id || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{agent.date || new Date().toISOString().split('T')[0]}</span>
              </div>
              {agent.role && (
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span>{agent.role}</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={onToggle}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Total Scans</p>
            <p className="text-2xl font-bold text-blue-700">{agent.total_scans || 0}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Orders</p>
            <p className="text-2xl font-bold text-emerald-700">{agent.total_orders || 0}</p>
          </div>
        </div>

        {agent.total_orders > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Avg Scans per Order</p>
              <p className="text-lg font-bold text-purple-700">{avgScansPerOrder}</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (avgScansPerOrder / 10) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {isExpanded && skuStats.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-600" />
              SKU Breakdown ({skuStats.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {skuStats.map((skuItem, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-mono text-sm text-gray-800 truncate flex-1">{skuItem.sku || "Unknown SKU"}</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {skuItem.count || 0} scans
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}