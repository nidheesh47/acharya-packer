import React from "react";
import { ShoppingBag, Clock, ListChecks, Truck, CheckCircle, XCircle } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, color, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} border border-${color}-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-xs sm:text-sm font-medium text-${color}-900 mb-0.5 sm:mb-1`}>{title}</p>
        <p className={`text-lg sm:text-2xl font-bold text-${color}-900`}>{value}</p>
      </div>
      <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
        <Icon className={`h-4 w-4 sm:h-6 sm:w-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

export default function OrdersStats({ stats }) {
  const statsConfig = [
    { title: "Total Orders", value: stats.total, icon: ShoppingBag, color: "indigo", gradient: "from-indigo-50 to-indigo-100" },
    { title: "Pending", value: stats.pending, icon: Clock, color: "amber", gradient: "from-amber-50 to-amber-100" },
    { title: "Items Scanned", value: stats.items_scanned, icon: ListChecks, color: "blue", gradient: "from-blue-50 to-blue-100" },
    { title: "Tracking Pending", value: stats.tracking_label_pending, icon: Truck, color: "purple", gradient: "from-purple-50 to-purple-100" },
    { title: "Completed", value: stats.scanned, icon: CheckCircle, color: "emerald", gradient: "from-emerald-50 to-emerald-100" },
    { title: "Cancelled", value: stats.cancelled, icon: XCircle, color: "rose", gradient: "from-rose-50 to-rose-100" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 mb-6">
      {statsConfig.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}