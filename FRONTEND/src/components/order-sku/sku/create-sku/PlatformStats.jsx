import { TrendingUp } from "lucide-react";

export function PlatformStats() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white/20 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Platform Stats</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-white mb-1">1M+</div>
            <div className="text-sm text-white/80">SKUs Managed</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xl font-bold text-white">99.9%</div>
              <div className="text-xs text-white/80">Accuracy</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-xl font-bold text-white">24/7</div>
              <div className="text-xs text-white/80">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}