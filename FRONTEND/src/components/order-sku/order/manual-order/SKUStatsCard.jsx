import { Grid3x3, Layers } from "lucide-react";

export function SKUStatsCard({ stats }) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Grid3x3 className="h-5 w-5" />
        SKU Catalog Stats
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm opacity-90">Total SKUs</p>
              <p className="text-3xl font-bold">{stats?.total || 0}</p>
            </div>
            <Layers className="h-8 w-8 text-white opacity-80" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-white">
              <p className="text-xs opacity-90">With Images</p>
              <p className="text-xl font-bold">{stats?.withImages || 0}</p>
              <p className="text-xs opacity-80">{stats?.imagePercentage || 0}%</p>
            </div>
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <div className="text-white">
              <p className="text-xs opacity-90">No Images</p>
              <p className="text-xl font-bold">{stats?.withoutImages || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}