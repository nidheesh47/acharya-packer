import { BarChart } from "lucide-react";

export function OrderSummaryCard({ totals, items }) {
  const uniqueProducts = new Set(items.filter(i => i.sku).map(i => i.sku)).size;
  const customSkus = items.filter(i => i.customSku && i.sku).length;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
          <BarChart className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Total Items</span>
          <span className="font-bold text-2xl text-gray-800">{totals.totalItems}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Unique Products</span>
          <span className="font-bold text-gray-800">{uniqueProducts}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Valid SKUs</span>
          <span className="font-bold text-green-600">{totals.validSkus}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Custom SKUs</span>
          <span className="font-bold text-amber-600">{customSkus}</span>
        </div>
      </div>
    </div>
  );
}