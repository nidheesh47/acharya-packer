import { Package, ChevronRight, BarChart3 } from "lucide-react";
import { SKUTable } from "./SKUTable";
import { AgentSummaryStats } from "./AgentSummaryStats";

export function AgentCard({ agent, index, isExpanded, onToggle }) {
  const agentId = agent._id || `agent-${index}`;
  const agentName = agent.name || "Unknown Agent";
  const agentRole = agent.role || "N/A";
  const totalScans = agent.total_scans || 0;
  const skuStats = Array.isArray(agent.sku_stats) ? agent.sku_stats : [];
  const skuCount = skuStats.length;
  const avgScansPerSku = skuCount > 0 ? Math.round(totalScans / skuCount) : 0;
  const topSku = skuStats[0]?.sku || "N/A";

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-6 cursor-pointer" onClick={onToggle}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">
                  {agentName.charAt(0).toUpperCase()}
                </span>
              </div>
              {index < 3 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  #{index + 1}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-gray-800">{agentName}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                  {agentRole}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="font-mono text-xs">ID: {agentId.substring(0, 12)}...</span>
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {skuCount} SKU{skuCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalScans.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total Scans</div>
            </div>
            
            <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 pt-0 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              SKU Scan Breakdown
            </h3>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </div>
          </div>

          <SKUTable skuStats={skuStats} totalScans={totalScans} />

          <div className="mt-6 pt-6 border-t border-gray-200">
            <AgentSummaryStats 
              skuCount={skuCount}
              avgScansPerSku={avgScansPerSku}
              topSku={topSku}
              rank={index + 1}
            />
          </div>
        </div>
      )}
    </div>
  );
}