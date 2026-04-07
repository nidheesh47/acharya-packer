import { usePackingStatus } from "../hooks/usePackingStatus";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { StatusHeader } from "./StatusHeader";
import { StatsCards } from "./StatsCards";
import { TodaySKUBreakdown } from "./TodaySKUBreakdown";
import { CareerSummary } from "./CareerSummary";
import { TopSKUsOverall } from "./TopSKUsOverall";
import { PerformanceInsights } from "./PerformanceInsights";
import { ActionButtons } from "./ActionButtons";

export default function PackingMyStatus() {
  const {
    loading,
    error,
    today,
    overall,
    lastUpdated,
    mounted,
    shopDomain,  // <-- ADD THIS - destructure shopDomain from the hook
    todayPerformance,
    overallPerformance,
    formattedDate,
    handleRefresh,
    calculateTrend
  } = usePackingStatus();

  if (loading) {
    return <LoadingState mounted={mounted} shopDomain={shopDomain} />;  // <-- Pass shopDomain as prop
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} mounted={mounted} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 w-full">
        <StatusHeader 
          formattedDate={formattedDate}
          lastUpdated={lastUpdated}
          onRefresh={handleRefresh}
        />

       <StatsCards 
  today={today}
  todayPerformance={todayPerformance}
  overall={overall}
  overallPerformance={overallPerformance}  // <-- PASS THIS PROP
  calculateTrend={calculateTrend}
/>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodaySKUBreakdown today={today} />
          </div>

          <div className="space-y-6">
            <CareerSummary overall={overall} overallPerformance={overallPerformance} />
            <TopSKUsOverall overall={overall} />
            <PerformanceInsights 
              todayPerformance={todayPerformance}
              today={today}
              overall={overall}
            />
          </div>
        </div>

        <ActionButtons onRefresh={handleRefresh} />
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          input, button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}