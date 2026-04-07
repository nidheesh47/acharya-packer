import { usePackingStats } from "../hooks/usePackingStatstotal";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { StatsHeader } from "./StatsHeader";
import { StatsCards } from "./StatsCards";
import { SearchFilterBar } from "./SearchFilterBar";
import { AgentsList } from "./AgentsList";
import { EmptyState } from "./EmptyState";
import { PerformanceSummary } from "./PerformanceSummary";

export default function PackingStats() {
  const {
    loading,
    error,
    searchTerm, setSearchTerm,
    filterRole, setFilterRole,
    expandedAgent, setExpandedAgent,
    shopDomain,
    mounted,
    filteredStats,
    uniqueRoles,
    totalScans,
    totalAgents,
    avgScansPerAgent,
    handleExportCSV,
    handleRefresh
  } = usePackingStats();

  const clearFilters = () => {
    setSearchTerm("");
    setFilterRole("all");
  };

  if (loading) {
    return <LoadingState mounted={mounted} shopDomain={shopDomain} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} mounted={mounted} />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <StatsHeader 
          onRefresh={handleRefresh}
          onExport={handleExportCSV}
          statsLength={filteredStats.length}
        />

        <StatsCards 
          totalAgents={totalAgents}
          totalScans={totalScans}
          avgScansPerAgent={avgScansPerAgent}
        />

        <SearchFilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterRole={filterRole}
          onFilterChange={setFilterRole}
          uniqueRoles={uniqueRoles}
          onClearFilters={clearFilters}
        />

        {filteredStats.length === 0 ? (
          <EmptyState 
            hasFilters={searchTerm !== "" || filterRole !== "all"} 
            onClearFilters={clearFilters}
          />
        ) : (
          <AgentsList 
            agents={filteredStats}
            expandedAgent={expandedAgent}
            onToggleAgent={setExpandedAgent}
          />
        )}

        {filteredStats.length > 0 && (
          <PerformanceSummary 
            agentCount={filteredStats.length}
            totalScans={totalScans}
            avgScansPerAgent={avgScansPerAgent}
          />
        )}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          input, button {
            font-size: 16px !important;
          }
        }
        
        @media (max-width: 640px) {
          button, 
          [role="button"],
          input[type="submit"] {
            min-height: 44px;
          }
          
          input, select, textarea {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}