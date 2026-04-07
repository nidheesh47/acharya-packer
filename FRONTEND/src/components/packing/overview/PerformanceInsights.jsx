import { Lightbulb, Sparkles, Rocket, Award, Target } from "lucide-react";

export function PerformanceInsights({ todayPerformance, today }) {
  const insights = [
    {
      condition: todayPerformance.efficiency > 85,
      icon: Sparkles,
      title: "Great Efficiency! 🎯",
      message: `Your efficiency is ${todayPerformance.efficiency}%, above the 85% target`,
      color: "yellow"
    },
    {
      condition: today?.total_scans >= 200,
      icon: Rocket,
      title: "Daily Goal Achieved! 🚀",
      message: "You've reached the daily target of 200 scans",
      color: "blue"
    },
    {
      condition: todayPerformance.uniqueSkus >= 25,
      icon: Award,
      title: "Excellent Variety! 🌟",
      message: `You've scanned ${todayPerformance.uniqueSkus} unique SKUs today`,
      color: "purple"
    }
  ];

  const hasInsight = insights.some(insight => insight.condition);
  const defaultInsight = {
    icon: Target,
    title: "Keep Going! 💪",
    message: "Keep scanning to reach your daily targets!",
    color: "amber"
  };

  const displayInsights = hasInsight ? insights.filter(i => i.condition) : [defaultInsight];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 w-full">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl">
          <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">Performance Insights</h3>
      </div>
      
      <div className="space-y-2 sm:space-y-3 w-full">
        {displayInsights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div key={idx} className="p-2 sm:p-3 bg-white/60 rounded-lg sm:rounded-xl w-full">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-${insight.color}-500`} />
                <span className="font-semibold text-gray-900 text-xs sm:text-sm">{insight.title}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600">{insight.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}