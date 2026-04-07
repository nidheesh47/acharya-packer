import { Package } from "lucide-react";

export function SKUTable({ skuStats, totalScans }) {
  if (skuStats.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No SKU scan data available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="py-3 px-4 rounded-l-lg">SKU Code</th>
            <th className="py-3 px-4">Scan Count</th>
            <th className="py-3 px-4">Percentage</th>
            <th className="py-3 px-4 rounded-r-lg">Progress</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {skuStats.map((skuItem, skuIndex) => {
            const skuName = skuItem.sku || "Unknown SKU";
            const skuCountValue = skuItem.count || 0;
            const percentage = totalScans > 0 
              ? Math.round((skuCountValue / totalScans) * 100) 
              : 0;
            
            return (
              <tr key={skuIndex} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-mono font-medium text-gray-800">{skuName}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-gray-800">{skuCountValue.toLocaleString()}</span>
                  <span className="text-gray-500 text-xs ml-1">scans</span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-gray-800">{percentage}%</span>
                </td>
                <td className="py-3 px-4">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
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
  );
}