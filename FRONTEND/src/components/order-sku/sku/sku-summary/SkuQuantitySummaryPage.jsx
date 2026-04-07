// pages/SkuQuantitySummaryPage.jsx
import { useState, useEffect } from "react";
import { useSKUSummary } from "../hooks/useSKUSummary";
import { exportToCSV } from "../utils/skuUtils";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { SKUSummaryHeader } from "./SKUSummaryHeader";
import { StatsGrid } from "./StatsGrid";
import { SearchControls } from "./SearchControls";
import { SKUTable } from "./SKUTable";
import { SKUGrid } from "./SKUGrid";
import { EmptyState } from "./EmptyState";
import { Footer } from "./Footer";

export default function SkuQuantitySummaryPage() {
  const [mounted, setMounted] = useState(false);
  const {
    loading,
    error,
    search,
    setSearch,
    sortConfig,
    viewMode,
    setViewMode,
    isMobile,
    shopDomain,
    lastUpdated,
    stats,
    ordered,
    packed,
    pending,
    filteredSkus,
    refreshData,
    handleSort,
  } = useSKUSummary();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = () => {
    exportToCSV(filteredSkus, ordered, packed, pending, shopDomain);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  if (loading) {
    return <LoadingState mounted={mounted} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refreshData} mounted={mounted} />;
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
    >
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <SKUSummaryHeader
          lastUpdated={lastUpdated}
          shopDomain={shopDomain}
          onRefresh={refreshData}
          onExport={handleExport}
          onPrint={handlePrint}
        />

        <StatsGrid stats={stats} />

        <SearchControls
          search={search}
          onSearchChange={setSearch}
          filteredCount={filteredSkus.length}
          totalCount={Object.keys(ordered).length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isMobile={isMobile}
          sortConfig={sortConfig}
        />

        {filteredSkus.length === 0 ? (
          <EmptyState search={search} onClearSearch={handleClearSearch} />
        ) : viewMode === "table" ? (
          <SKUTable
            skus={filteredSkus}
            ordered={ordered}
            packed={packed}
            pending={pending}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        ) : (
          <SKUGrid
            skus={filteredSkus}
            ordered={ordered}
            packed={packed}
            pending={pending}
          />
        )}

        <Footer filteredCount={filteredSkus.length} stats={stats} />
      </div>
    </div>
  );
}
