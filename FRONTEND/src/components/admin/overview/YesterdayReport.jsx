import { CalendarDays } from "lucide-react";
import { ComparisonItem } from "./ComparisonItem";

export function YesterdayReport({ today, yesterday }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gray-50 rounded-xl">
            <CalendarDays className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Yesterday's Report</h3>
            <p className="text-xs text-gray-500">{yesterday.date}</p>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <ComparisonItem 
          label="Total Orders" 
          today={today.orders.total} 
          yesterday={yesterday.orders.total} 
        />
        <ComparisonItem 
          label="Completed Orders" 
          today={today.orders.scanned} 
          yesterday={yesterday.orders.scanned} 
        />
        <ComparisonItem 
          label="Pending Orders" 
          today={today.orders.pending} 
          yesterday={yesterday.orders.pending} 
        />
        <ComparisonItem 
          label="Cancelled Orders" 
          today={today.orders.cancelled} 
          yesterday={yesterday.orders.cancelled} 
        />
        <ComparisonItem 
          label="SKU Ordered" 
          today={today.sku.total_ordered_quantity} 
          yesterday={yesterday.sku.total_ordered_quantity} 
        />
        <ComparisonItem 
          label="SKU Scanned" 
          today={today.sku.total_scanned_quantity} 
          yesterday={yesterday.sku.total_scanned_quantity} 
        />
      </div>
    </div>
  );
}