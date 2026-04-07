export function StatCard({ label, value, icon, gradient, bgGradient, textColor }) {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} shadow-sm`}>
          <div className="text-white">{icon}</div>
        </div>
        <span className={`text-2xl font-bold ${textColor}`}>{value}</span>
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}