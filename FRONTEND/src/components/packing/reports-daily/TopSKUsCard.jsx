import { PieChart } from "lucide-react";

export function TopSKUsCard({ topSkus, totalScans }) {
  if (topSkus.length === 0) return null;

  const colors = [
    "from-yellow-500 to-amber-500",
    "from-gray-500 to-slate-500",
    "from-orange-500 to-red-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
          <PieChart className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Top Performing SKUs</h3>
          <p className="text-sm text-gray-500">Most scanned products today</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {topSkus.map(([sku, count], index) => {
          const percentage = totalScans > 0 ? ((count / totalScans) * 100).toFixed(1) : 0;
          
          return (
            <div key={index} className="group hover:bg-gray-50 rounded-lg p-4 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${colors[index]} flex items-center justify-center shadow-sm`}>
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{sku}</p>
                    <p className="text-xs text-gray-500">Product SKU</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{count.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">scans</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${colors[index]} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-600">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}