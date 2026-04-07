export function MetricBox({ label, value, icon, color }) {
  const colors = {
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className={`inline-flex p-1.5 rounded-lg ${colors[color]} mb-2`}>
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}