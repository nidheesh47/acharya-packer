import { Database, Tag, PackageOpen, ImageIcon, AlertCircle, Crown } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsCards({ stats }) {
  const statItems = [
    {
      label: "Total SKUs",
      value: stats.total,
      icon: <Database className="h-5 w-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      textColor: "text-blue-600"
    },
    {
      label: "Simple",
      value: stats.simple,
      icon: <Tag className="h-5 w-5" />,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      textColor: "text-emerald-600"
    },
    {
      label: "Bundles",
      value: stats.bundles,
      icon: <PackageOpen className="h-5 w-5" />,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      textColor: "text-purple-600"
    },
    {
      label: "With Images",
      value: stats.withImages,
      icon: <ImageIcon className="h-5 w-5" />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      textColor: "text-amber-600"
    },
    {
      label: "Unnamed",
      value: stats.withoutNames,
      icon: <AlertCircle className="h-5 w-5" />,
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      textColor: "text-rose-600"
    },
    {
      label: "Complete",
      value: stats.complete,
      icon: <Crown className="h-5 w-5" />,
      gradient: "from-yellow-500 to-amber-500",
      bgGradient: "from-yellow-50 to-amber-50",
      textColor: "text-amber-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statItems.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}