import { Users, Package, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsCards({ totalAgents, totalScans, avgScansPerAgent }) {
  const stats = [
    {
      label: "Active Agents",
      value: totalAgents,
      icon: <Users className="h-5 w-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-600",
      description: "Packing team members"
    },
    {
      label: "Total Scans",
      value: totalScans.toLocaleString(),
      icon: <Package className="h-5 w-5" />,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      textColor: "text-emerald-600",
      description: "All-time scan count"
    },
    {
      label: "Avg Scans/Agent",
      value: avgScansPerAgent.toLocaleString(),
      icon: <TrendingUp className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      textColor: "text-purple-600",
      description: "Average performance"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}