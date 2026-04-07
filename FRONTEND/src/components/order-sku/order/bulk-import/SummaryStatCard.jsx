export function SummaryStatCard({ label, value, icon, bgColor, iconBgColor, iconColor }) {
  const Icon = icon;
  
  return (
    <div className={`${bgColor} border rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}