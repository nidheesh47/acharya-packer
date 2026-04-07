import { BarChart3, Package } from "lucide-react";
import { useNavigate } from "react-router";
import { SKUItem } from "./SKUItem";

export function TodaySKUBreakdown({ today }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Today's SKU Breakdown</h3>
              <p className="text-sm text-gray-500">Most scanned items</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            {today?.sku_stats?.length || 0} total SKUs
          </div>
        </div>
        
        {today?.sku_stats?.length > 0 ? (
          <div className="space-y-3">
            {today.sku_stats.slice(0, 5).map((item, index) => (
              <SKUItem 
                key={index} 
                item={item} 
                index={index + 1}
                totalScans={today.total_scans}
              />
            ))}
            
            {today.sku_stats.length > 5 && (
              <div className="pt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  +{today.sku_stats.length - 5} more SKUs
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No scans recorded today</p>
            <p className="text-sm text-gray-400 mt-1">Start scanning to see your stats!</p>
            <button
              onClick={() => navigate("/packing/order/scan/page")}
              className="mt-4 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-md transition-all"
            >
              Start Scanning
            </button>
          </div>
        )}
      </div>
    </div>
  );
}