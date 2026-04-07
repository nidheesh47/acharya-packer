import { Package, Scan, Clock, Target } from "lucide-react";
import { useAdminStats } from "../hooks/useAdminStats";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { Header } from "./Header";
import { HeroScoreCard } from "./HeroScoreCard";
import { KPICard } from "./KPICard";
import { TodayPerformance } from "./TodayPerformance";
import { YesterdayReport } from "./YesterdayReport";
import { SKUBreakdown } from "./SKUBreakdown";

export default function AdminOverview() {
  const {
    today,
    yesterday,
    loading,
    error,
    lastRefresh,
    fetchStats,
    calculateChange,
    getScanRate,
    getEfficiencyScore
  } = useAdminStats();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchStats} />;
  if (!today || !yesterday) return null;

  const scanRateData = getScanRate();
  const efficiencyScore = getEfficiencyScore();
  const scanRate = today.orders.total > 0 
    ? ((today.orders.scanned / today.orders.total) * 100).toFixed(0) 
    : 0;
  const skuEfficiency = today.sku.total_ordered_quantity > 0 
    ? ((today.sku.total_scanned_quantity / today.sku.total_ordered_quantity) * 100).toFixed(0) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <Header lastRefresh={lastRefresh} onRefresh={fetchStats} />
      
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <HeroScoreCard 
          efficiencyScore={efficiencyScore}
          scanRate={scanRate}
          skuEfficiency={skuEfficiency}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Total Orders"
            value={today.orders.total}
            change={calculateChange(today.orders.total, yesterday.orders.total)}
            icon={<Package className="h-5 w-5" />}
            trend="vs yesterday"
          />
          <KPICard
            title="Scan Rate"
            value={`${scanRateData?.today || 0}%`}
            change={scanRateData?.change}
            icon={<Scan className="h-5 w-5" />}
            trend="completion rate"
          />
          <KPICard
            title="Pending"
            value={today.orders.pending}
            change={calculateChange(today.orders.pending, yesterday.orders.pending)}
            icon={<Clock className="h-5 w-5" />}
            trend="awaiting processing"
          />
          <KPICard
            title="SKU Efficiency"
            value={skuEfficiency}
            change={calculateChange(
              today.sku.total_ordered_quantity > 0 ? (today.sku.total_scanned_quantity / today.sku.total_ordered_quantity * 100) : 0,
              yesterday.sku.total_ordered_quantity > 0 ? (yesterday.sku.total_scanned_quantity / yesterday.sku.total_ordered_quantity * 100) : 0
            )}
            icon={<Target className="h-5 w-5" />}
            trend="inventory accuracy"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <TodayPerformance today={today} scanRateData={scanRateData} />
          <YesterdayReport today={today} yesterday={yesterday} />
        </div>

        <SKUBreakdown skuBreakdown={today.sku.breakdown} />
      </div>
    </div>
  );
}