import { ShoppingBag, Clock, ListChecks, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function StatsCards({ stats }) {
  const cards = [
    { label: "Total Orders", value: stats.total, color: "indigo", icon: ShoppingBag },
    { label: "Pending", value: stats.pending, color: "amber", icon: Clock },
    { label: "Items Scanned", value: stats.items_scanned, color: "blue", icon: ListChecks },
    { label: "Tracking Pending", value: stats.tracking_label_pending, color: "purple", icon: Truck },
    { label: "Completed", value: stats.scanned, color: "emerald", icon: CheckCircle },
    { label: "Cancelled", value: stats.cancelled, color: "rose", icon: XCircle }
  ];

  const colorClasses = {
    indigo: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-900",
    amber: "from-amber-50 to-amber-100 border-amber-200 text-amber-900",
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-900",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-900",
    emerald: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-900",
    rose: "from-rose-50 to-rose-100 border-rose-200 text-rose-900"
  };

  const iconColors = {
    indigo: "text-indigo-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    emerald: "text-emerald-600",
    rose: "text-rose-600"
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${colorClasses[card.color]} border rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">{card.label}</p>
                <p className="text-lg sm:text-2xl font-bold">{card.value}</p>
              </div>
              <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
                <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${iconColors[card.color]}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}