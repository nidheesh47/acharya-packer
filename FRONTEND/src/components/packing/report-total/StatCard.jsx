export function StatCard({ label, value, icon, gradient, bgGradient, textColor, description }) {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-gradient-to-r ${gradient} shadow-sm`}>
          <div className="text-white">{icon}</div>
        </div>
        <span className={`text-2xl font-bold ${textColor}`}>{value}</span>
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}