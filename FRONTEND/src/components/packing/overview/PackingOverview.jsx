import { Scan, Clock, Target, CheckCircle, Layers, Gauge } from "lucide-react";
import { usePackingStats } from "../hooks/usePackingStats";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { Header } from "./Header";
import { WelcomeBanner } from "./WelcomeBanner";
import { PeriodSelector } from "./PeriodSelector";
import { StatCard } from "./StatCard";
import { PerformanceOverview } from "./PerformanceOverview";
import { TopSKUs } from "./TopSKUs";
import { PerformanceInsights } from "./PerformanceInsights";
import { QuickStats } from "./QuickStats";
import { TodayVsOverall } from "./TodayVsOverall";
import { ActionButtons } from "./ActionButtons";

export default function PackingOverview() {
  const {
    loading,
    admin,
    today,
    overall,
    error,
    lastUpdated,
    activePeriod,
    isRefreshing,
    mounted,
    todayPerformance,
    overallPerformance,
    activeStats,
    activePerformance,
    handleRefresh,
    handlePeriodChange,
  } = usePackingStats();

  if (loading) return <LoadingState mounted={mounted} />;
  if (error)
    return (
      <ErrorState
        error={error}
        isRefreshing={isRefreshing}
        onRetry={handleRefresh}
        mounted={mounted}
      />
    );
  if (!today || !overall) return null;

  const statCards = [
    {
      label: "Total Scans",
      value: activeStats?.total_scans || 0,
      icon: <Scan className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      description: "Items scanned",
    },
    {
      label: "Orders Completed",
      value: activeStats?.total_orders || 0,
      icon: <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      description: "Packed orders",
    },
    {
      label: "Efficiency Rate",
      value: `${activePerformance.efficiency || 0}%`,
      icon: <Gauge className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      description: "Performance score",
    },
    {
      label: "Unique SKUs",
      value: activePerformance.uniqueSkus || 0,
      icon: <Layers className="h-4 w-4 sm:h-5 sm:w-5" />,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      description: "Different items",
    },
  ];

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/30 transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          <Header
            admin={admin}
            lastUpdated={lastUpdated}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />

          <WelcomeBanner
            admin={admin}
            today={today}
            todayPerformance={todayPerformance}
          />

          <PeriodSelector
            activePeriod={activePeriod}
            onPeriodChange={handlePeriodChange}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full mb-6 sm:mb-8">
            {statCards.map((card, idx) => (
              <StatCard
                key={idx}
                label={card.label}
                value={card.value}
                icon={card.icon}
                gradient={card.gradient}
                bgGradient={card.bgGradient}
                description={card.description}
                period={activePeriod}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full">
              <PerformanceOverview
                activeStats={activeStats}
                activePerformance={activePerformance}
              />
              <TopSKUs activeStats={activeStats} activePeriod={activePeriod} />
            </div>

            <div className="space-y-4 sm:space-y-6 w-full">
              <PerformanceInsights
                todayPerformance={todayPerformance}
                today={today}
              />
              <QuickStats activePerformance={activePerformance} />
              <TodayVsOverall
                today={today}
                overall={overall}
                todayPerformance={todayPerformance}
                overallPerformance={overallPerformance}
              />
            </div>
          </div>

          <ActionButtons
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
    </div>
  );
}
