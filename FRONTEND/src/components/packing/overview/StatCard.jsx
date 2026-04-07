export function StatCard({ label, value, icon, gradient, bgGradient, description, period }) {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 w-full`}>
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1 truncate">{label}</p>
          <p className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent truncate">
            {value}
          </p>
          {description && (
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">{description}</p>
          )}
        </div>
        <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r ${gradient} shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 ml-2`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
      <div className="mt-1 sm:mt-2">
        <span className="text-[10px] sm:text-xs text-gray-400 capitalize">{period === "overall" ? "All Time" : "Today"}</span>
      </div>
    </div>
  );
}