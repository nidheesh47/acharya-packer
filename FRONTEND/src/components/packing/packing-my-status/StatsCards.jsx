import { ShoppingCart, CheckCircle, Package, Activity } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsCards({ 
  today, 
  todayPerformance, 
  overall, 
  overallPerformance,  // <-- ADD THIS as a prop
  calculateTrend 
}) {
  const stats = [
    {
      title: "Total Scans",
      value: today?.total_scans || 0,
      icon: <ShoppingCart className="h-5 w-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-600",
      trend: calculateTrend(today?.total_scans, overall?.total_scans),
      trendLabel: "vs daily avg"
    },
    {
      title: "Orders Completed",
      value: today?.total_orders || 0,
      icon: <CheckCircle className="h-5 w-5" />,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      textColor: "text-emerald-600",
      trend: calculateTrend(today?.total_orders, overall?.total_orders),
      trendLabel: "vs daily avg"
    },
    {
      title: "Unique SKUs",
      value: todayPerformance.uniqueSkus || 0,
      icon: <Package className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      textColor: "text-purple-600",
      trend: calculateTrend(todayPerformance.uniqueSkus, overallPerformance.uniqueSkus),  // <-- Now uses overallPerformance
      trendLabel: "vs daily avg"
    },
    {
      title: "Efficiency Score",
      value: `${todayPerformance.efficiency || 0}%`,
      icon: <Activity className="h-5 w-5" />,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      textColor: "text-orange-600",
      trend: calculateTrend(todayPerformance.efficiency, overallPerformance.efficiency),  // <-- Now uses overallPerformance
      trendLabel: "vs target"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}