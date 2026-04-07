// components/admin-login/FeatureGrid.jsx
import { Zap, BarChart, Package, Truck } from "lucide-react";

export const FeatureGrid = () => {
  const features = [
    { icon: Zap, text: "Real-time Tracking", color: "text-cyan-600", bgColor: "bg-cyan-50" },
    { icon: BarChart, text: "Advanced Analytics", color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { icon: Package, text: "Bundle Management", color: "text-orange-600", bgColor: "bg-orange-50" },
    { icon: Truck, text: "Logistics Integration", color: "text-blue-600", bgColor: "bg-blue-50" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div 
            key={idx} 
            className="group flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className={`p-2 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform`}>
              <Icon className={`h-4 w-4 ${feature.color}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {feature.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};