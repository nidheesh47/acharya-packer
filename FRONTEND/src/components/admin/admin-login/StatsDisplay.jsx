// components/admin-login/StatsDisplay.jsx
import { CheckCircle, TrendingUp, Headphones } from "lucide-react";

export const StatsDisplay = () => {
  const stats = [
    { value: "99.9%", label: "Accuracy Rate", description: "Precision scanning technology", icon: CheckCircle },
    { value: "10x", label: "Faster Processing", description: "Compared to manual systems", icon: TrendingUp },
    { value: "24/7", label: "Support", description: "Dedicated assistance team", icon: Headphones },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="text-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex justify-center mb-2">
              <Icon className="h-6 w-6 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 mb-1">{stat.value}</div>
            <div className="text-xs font-medium text-gray-700 mb-1">{stat.label}</div>
            <div className="text-[10px] text-gray-500">{stat.description}</div>
          </div>
        );
      })}
    </div>
  );
};