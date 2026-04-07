import { Clock, Calendar } from "lucide-react";

export function PeriodSelector({ activePeriod, onPeriodChange }) {
  const periods = [
    { key: "today", label: "Today", icon: Clock },
    { key: "overall", label: "All Time", icon: Calendar }
  ];

  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 border border-gray-200 shadow-sm">
        {periods.map((period) => {
          const Icon = period.icon;
          return (
            <button
              key={period.key}
              onClick={() => onPeriodChange(period.key)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base whitespace-nowrap ${
                activePeriod === period.key
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {period.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}