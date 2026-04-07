export function AgentSummaryStats({ skuCount, avgScansPerSku, topSku, rank }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-600 font-medium">Total SKUs</p>
        <p className="text-2xl font-bold text-blue-600">{skuCount}</p>
      </div>
      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
        <p className="text-sm text-gray-600 font-medium">Avg/Per SKU</p>
        <p className="text-2xl font-bold text-emerald-600">{avgScansPerSku}</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <p className="text-sm text-gray-600 font-medium">Top SKU</p>
        <p className="text-base font-bold text-purple-600 truncate">{topSku}</p>
      </div>
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <p className="text-sm text-gray-600 font-medium">Rank</p>
        <p className="text-2xl font-bold text-amber-600">#{rank}</p>
      </div>
    </div>
  );
}