import { Sparkles, Rocket, Gem } from "lucide-react";

export function PerformanceInsights({ todayPerformance, today, overall }) {
  const dailyAverage = (overall?.total_scans || 0) / 30;
  const isAboveAverage = today?.total_scans > dailyAverage;
  const isPerfectVariety = todayPerformance.uniqueSkus === todayPerformance.totalScans && todayPerformance.uniqueSkus > 0;

  return (
    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
          <Lightbulb className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Performance Insights</h3>
      </div>
      
      <div className="space-y-3">
        {todayPerformance.efficiency > 85 && (
          <div className="p-3 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold text-gray-800 text-sm">Excellent Efficiency! 🎯</span>
            </div>
            <p className="text-xs text-gray-600">Your efficiency is {todayPerformance.efficiency}%, above the 85% target</p>
          </div>
        )}
        
        {isAboveAverage && (
          <div className="p-3 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Rocket className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-gray-800 text-sm">Above Average! 🚀</span>
            </div>
            <p className="text-xs text-gray-600">Today's scans are above your daily average</p>
          </div>
        )}
        
        {isPerfectVariety && (
          <div className="p-3 bg-white rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Gem className="h-4 w-4 text-purple-500" />
              <span className="font-semibold text-gray-800 text-sm">Perfect Variety! ✨</span>
            </div>
            <p className="text-xs text-gray-600">Every scan was a unique SKU today!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Lightbulb Icon Component
function Lightbulb({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}