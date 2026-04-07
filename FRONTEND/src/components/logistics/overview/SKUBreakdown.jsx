import { Gem, Package } from "lucide-react";

export function SKUBreakdown({ skuBreakdown }) {
  if (!skuBreakdown?.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Gem className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">SKU Performance Breakdown</h3>
              <p className="text-xs text-gray-500">Detailed analysis by product code</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Top {Math.min(5, skuBreakdown.length)} of {skuBreakdown.length} SKUs
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {skuBreakdown.slice(0, 5).map((sku, idx) => {
          const completionRate = sku.ordered_quantity > 0 
            ? (sku.scanned_quantity / sku.ordered_quantity) * 100 
            : 100;
          return (
            <div key={idx} className="p-5 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    completionRate >= 80 ? 'bg-green-100' :
                    completionRate >= 50 ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <Package className={`h-4 w-4 ${
                      completionRate >= 80 ? 'text-green-600' :
                      completionRate >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-gray-900">{sku.sku}</div>
                    <div className="text-xs text-gray-500">Product Code</div>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  completionRate >= 80 ? 'bg-green-100 text-green-700' :
                  completionRate >= 50 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {completionRate.toFixed(0)}% Complete
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Ordered Quantity</div>
                  <div className="text-lg font-bold text-gray-900">{sku.ordered_quantity}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Scanned Quantity</div>
                  <div className="text-lg font-bold text-green-600">{sku.scanned_quantity}</div>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    completionRate >= 80 ? 'bg-green-500' :
                    completionRate >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}