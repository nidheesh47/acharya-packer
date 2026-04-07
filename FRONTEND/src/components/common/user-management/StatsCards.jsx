import { Users, Crown, Shield, Package } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsCards({ users }) {
  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-600"
    },
    {
      label: "Admins",
      value: users.filter(u => u.role === "admin").length,
      icon: <Crown className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      textColor: "text-purple-600"
    },
    {
      label: "Logistics",
      value: users.filter(u => u.role === "logistics").length,
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-600"
    },
    {
      label: "Packing Team",
      value: users.filter(u => u.role === "packing").length,
      icon: <Package className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      textColor: "text-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}