import { User, Calendar, Shield, Package, ChevronUp, ChevronDown } from "lucide-react";

export function AgentListRow({ agent, isExpanded, onToggle }) {
  const avgScansPerOrder = agent.total_orders > 0 
    ? (agent.total_scans / agent.total_orders).toFixed(1) 
    : 0;
  const skuStats = Array.isArray(agent.sku_stats) ? agent.sku_stats : [];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{agent.agent_name || "Unknown Agent"}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">ID: {agent.agent_id || "N/A"}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-sm text-gray-500">{agent.date || new Date().toISOString().split('T')[0]}</span>
                {agent.role && (
                  <>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{agent.role}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{agent.total_scans || 0}</div>
              <div className="text-xs text-gray-500">Scans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-700">{agent.total_orders || 0}</div>
              <div className="text-xs text-gray-500">Orders</div>
            </div>
            {agent.total_orders > 0 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">{avgScansPerOrder}</div>
                <div className="text-xs text-gray-500">Avg/Order</div>
              </div>
            )}
            <button
              onClick={onToggle}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isExpanded && skuStats.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              SKU Statistics ({skuStats.length} items)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Scan Count</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Percentage</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {skuStats.map((skuItem, index) => {
                    const count = skuItem.count || 0;
                    const percentage = agent.total_scans > 0 
                      ? ((count / agent.total_scans) * 100).toFixed(1) 
                      : 0;
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm font-medium text-gray-800">{skuItem.sku || "Unknown SKU"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                            {count} scan{count !== 1 ? 's' : ''}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-800">{percentage}%</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}