export function StatCard({ label, value, icon, gradient, bgGradient, textColor }) {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-lg sm:rounded-2xl p-3 sm:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r ${gradient} shadow-sm`}>
          <div className="text-white">{icon}</div>
        </div>
        <span className={`text-lg sm:text-2xl font-bold ${textColor}`}>{value}</span>
      </div>
      <p className="text-xs sm:text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}