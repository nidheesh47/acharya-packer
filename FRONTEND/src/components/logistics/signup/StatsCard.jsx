export function StatsCard({ value, label, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className={`p-2 rounded-lg bg-gradient-to-r ${color} inline-flex mb-2`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}