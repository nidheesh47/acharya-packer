import { usePackingReport } from "../hooks/usePackingReport";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { ReportHeader } from "./ReportHeader";
import { StatsCards } from "./StatsCards";
import { TopSKUsCard } from "./TopSKUsCard";
import { SearchFilterBar } from "./SearchFilterBar";
import { AgentsGridView } from "./AgentsGridView";
import { AgentsListView } from "./AgentsListView";
import { EmptyState } from "./EmptyState";
import { SummaryFooter } from "./SummaryFooter";

export default function TodayPackingScanReport() {
  const {
    loading,
    error,
    viewMode, setViewMode,
    searchTerm, setSearchTerm,
    expandedAgent, setExpandedAgent,
    shopDomain,
    mounted,
    filteredStats,
    totalScansToday,
    totalOrdersToday,
    uniqueAgents,
    topSkus,
    fetchTodayStats,
    handleExportCSV,
    handlePrint
  } = usePackingReport();

  if (loading) {
    return <LoadingState mounted={mounted} shopDomain={shopDomain} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 flex flex-col ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative flex-1 flex flex-col overflow-hidden">
        <div className="relative flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full overflow-y-auto">
          <ReportHeader 
            onRefresh={fetchTodayStats}
            onExport={handleExportCSV}
            onPrint={handlePrint}
            statsLength={filteredStats.length}
          />

          <StatsCards 
            totalScans={totalScansToday}
            totalOrders={totalOrdersToday}
            uniqueAgents={uniqueAgents}
          />

          {error && <ErrorState error={error} />}

          <TopSKUsCard topSkus={topSkus} totalScans={totalScansToday} />

          {filteredStats.length > 0 && (
            <SearchFilterBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onClearSearch={() => setSearchTerm("")}
            />
          )}

          {filteredStats.length === 0 ? (
            <EmptyState 
              hasSearch={searchTerm !== ""} 
              onClearSearch={() => setSearchTerm("")} 
            />
          ) : viewMode === "grid" ? (
            <AgentsGridView 
              agents={filteredStats}
              expandedAgent={expandedAgent}
              onToggleAgent={setExpandedAgent}
            />
          ) : (
            <AgentsListView 
              agents={filteredStats}
              expandedAgent={expandedAgent}
              onToggleAgent={setExpandedAgent}
            />
          )}

          {filteredStats.length > 0 && (
            <SummaryFooter 
              totalScans={totalScansToday}
              totalOrders={totalOrdersToday}
              uniqueAgents={uniqueAgents}
            />
          )}
        </div>
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