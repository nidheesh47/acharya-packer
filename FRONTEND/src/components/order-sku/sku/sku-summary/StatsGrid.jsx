// components/sku-summary/StatsGrid.jsx
import { Hash, Box, PackageCheck, PackageX, Target } from "lucide-react";
import { StatCard } from "./StatCard";

export const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <StatCard 
        label="Total SKUs" 
        value={stats.totalSkus.toLocaleString()} 
        icon={<Hash className="h-5 w-5" />}
        gradient="from-indigo-500 to-blue-500"
      />
      <StatCard 
        label="Ordered" 
        value={stats.totalOrdered.toLocaleString()} 
        icon={<Box className="h-5 w-5" />}
        gradient="from-blue-500 to-cyan-500"
      />
      <StatCard 
        label="Packed" 
        value={stats.totalPacked.toLocaleString()} 
        icon={<PackageCheck className="h-5 w-5" />}
        gradient="from-emerald-500 to-green-500"
        trend={stats.trend}
      />
      <StatCard 
        label="Pending" 
        value={stats.totalPending.toLocaleString()} 
        icon={<PackageX className="h-5 w-5" />}
        gradient="from-rose-500 to-pink-500"
      />
      <StatCard 
        label="Fulfillment" 
        value={`${stats.completion}%`} 
        icon={<Target className="h-5 w-5" />}
        gradient={stats.completion >= 80 ? "from-emerald-500 to-green-500" : stats.completion >= 50 ? "from-amber-500 to-orange-500" : "from-rose-500 to-pink-500"}
        progress={stats.completion}
      />
    </div>
  );
};