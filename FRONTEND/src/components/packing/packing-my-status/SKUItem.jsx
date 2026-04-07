export function SKUItem({ item, index, totalScans }) {
  const rankColors = [
    "from-yellow-500 to-amber-500",
    "from-gray-500 to-slate-500",
    "from-orange-500 to-red-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500"
  ];
  
  const percentage = totalScans > 0 ? ((item.count || 0) / totalScans * 100).toFixed(1) : 0;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all group">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${rankColors[index - 1] || 'from-gray-500 to-slate-500'} flex items-center justify-center shadow-sm`}>
          <span className="text-white font-bold text-sm">#{index}</span>
        </div>
        <div>
          <p className="font-mono font-bold text-gray-800">{item.sku || "Unknown SKU"}</p>
          <p className="text-xs text-gray-500">{percentage}% of today's scans</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-gray-800">{item.count?.toLocaleString() || 0}</span>
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${rankColors[index - 1] || 'from-blue-500 to-cyan-500'} rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
}