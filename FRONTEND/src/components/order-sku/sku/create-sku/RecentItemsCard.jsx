import { Clock } from "lucide-react";
import { Link } from "react-router";
import { RecentItem } from "./RecentItem";

export function RecentItemsCard({ recentSkus }) {
  if (recentSkus.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Recently Created</h3>
              <p className="text-xs text-gray-500">Latest additions</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
            {recentSkus.length}
          </span>
        </div>
        
        <div className="space-y-3">
          {recentSkus.map((item, index) => (
            <RecentItem key={index} item={item} />
          ))}
        </div>
        
        <div className="mt-4">
          <Link
            to="/all/sku/list"
            className="w-full py-2.5 text-center text-sm font-semibold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-200 block"
          >
            View All SKUs →
          </Link>
        </div>
      </div>
    </div>
  );
}