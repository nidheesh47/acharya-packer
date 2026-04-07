import { Crown } from "lucide-react";

export function HeroScoreCard({ efficiencyScore, scanRate, skuEfficiency }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl mb-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="relative p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                Performance Score
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Operational Excellence</h2>
            <p className="text-gray-300 text-sm">Real-time efficiency metric based on order processing</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#scoreGradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * efficiencyScore) / 100}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-2xl font-bold text-white">{efficiencyScore}%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-300">Scan Rate</div>
                <div className="text-lg font-bold text-white">{scanRate}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-[10px] text-gray-300">SKU Eff.</div>
                <div className="text-lg font-bold text-white">{skuEfficiency}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}