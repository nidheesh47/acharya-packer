import { Package, CheckCircle, Users, Zap } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsCards({ totalScans, totalOrders, uniqueAgents }) {
  const stats = [
    {
      label: "Total Scans",
      value: totalScans.toLocaleString(),
      icon: <Package className="h-5 w-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-600",
      description: "Today's scanning activity"
    },
    {
      label: "Orders Processed",
      value: totalOrders.toLocaleString(),
      icon: <CheckCircle className="h-5 w-5" />,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      textColor: "text-emerald-600",
      description: "Completed orders"
    },
    {
      label: "Active Agents",
      value: uniqueAgents,
      icon: <Users className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      textColor: "text-purple-600",
      description: "Packing team members"
    },
    {
      label: "Efficiency",
      value: `${totalOrders > 0 ? Math.round((totalScans / totalOrders) * 10) : 0}%`,
      icon: <Zap className="h-5 w-5" />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      textColor: "text-amber-600",
      description: "Scan to order ratio"
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