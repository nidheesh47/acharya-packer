import { Star, Package } from "lucide-react";

export function TopSKUsOverall({ overall }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Star className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">All-Time Top SKUs</h3>
          <p className="text-sm text-gray-500">Your most scanned items</p>
        </div>
      </div>

      {overall?.sku_stats?.length > 0 ? (
        <div className="space-y-2">
          {overall.sku_stats.slice(0, 4).map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-yellow-100 text-yellow-700' :
                  index === 1 ? 'bg-gray-100 text-gray-700' :
                  index === 2 ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  <span className="text-xs font-bold">#{index + 1}</span>
                </div>
                <span className="font-mono text-sm text-gray-800 truncate max-w-[120px]">{item.sku}</span>
              </div>
              <span className="text-sm font-bold text-gray-800">{item.count?.toLocaleString() || 0}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No overall data available</p>
        </div>
      )}
    </div>
  );
}