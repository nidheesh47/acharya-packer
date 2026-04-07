import { Zap, BarChart, Shield, Rocket } from "lucide-react";

const iconMap = {
  Zap: Zap,
  BarChart: BarChart,
  Shield: Shield,
  Rocket: Rocket
};

export function FeaturesCard({ features }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">Key Features</h3>
        </div>
        <div className="space-y-3">
          {features.map((feature, idx) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                <Icon className={`h-5 w-5 ${feature.color}`} />
                <span className="text-sm text-white">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}