import { Users, Package, Target, Headphones } from "lucide-react";
import { StatCard } from "./StatCard";

const iconMap = {
  Users: Users,
  Package: Package,
  Target: Target,
  Headphones: Headphones
};

export function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, idx) => {
        const Icon = iconMap[stat.icon];
        return (
          <StatCard
            key={idx}
            value={stat.value}
            label={stat.label}
            icon={Icon}
            color={stat.color}
          />
        );
      })}
    </div>
  );
}