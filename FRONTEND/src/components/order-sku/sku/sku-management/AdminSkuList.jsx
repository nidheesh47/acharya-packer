import { useSKUManagement } from "../hooks/useSKUManagement";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { Header } from "./Header";
import { StatsCards } from "./StatsCards";
import { ActionBar } from "./ActionBar";
import { SKUGridView } from "./SKUGridView";
import { SKUListView } from "./SKUListView";
import { FooterStats } from "./FooterStats";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { BundlePreviewModal } from "./BundlePreviewModal";

export default function AdminSkuList() {
  const {
    loading,
    error,
    stats,
    searchTerm,
    viewMode,
    filteredSkus,
    skus,
    showConfirm,
    skuToDelete,
    bundlePreview,
    existingSkus,
    editingSku,
    form,
    actionLoading,
    setSearchTerm,
    setViewMode,
    setShowConfirm,
    setSkuToDelete,
    setBundlePreview,
    setEditingSku,
    setForm,
    fetchSkus,
    startEdit,
    handleUpdate,
    handleDelete,
    checkSkuExists,
    handleExport
  } = useSKUManagement();

  if (loading) return <LoadingState />;

  const commonProps = {
    existingSkus,
    editingSku,
    form,
    setForm,
    startEdit,
    handleUpdate,
    setEditingSku,
    actionLoading,
    setShowConfirm,
    setSkuToDelete,
    setBundlePreview,
    checkSkuExists
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <Header 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onRefresh={fetchSkus}
        />

        <StatsCards stats={stats} />

        <ActionBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExport={handleExport}
        />

        {error && <ErrorState error={error} onRetry={fetchSkus} />}

        {viewMode === "grid" ? (
          <SKUGridView 
            skus={filteredSkus}
            {...commonProps}
          />
        ) : (
          <SKUListView 
            skus={filteredSkus}
            {...commonProps}
          />
        )}

        <FooterStats 
          filteredCount={filteredSkus.length}
          totalCount={skus.length}
          searchTerm={searchTerm}
          stats={stats}
        />
      </div>

      {showConfirm && skuToDelete && (
        <DeleteConfirmModal
          skuToDelete={skuToDelete}
          actionLoading={actionLoading}
          handleDelete={handleDelete}
          setShowConfirm={setShowConfirm}
          setSkuToDelete={setSkuToDelete}
        />
      )}

      {bundlePreview && (
        <BundlePreviewModal
          bundlePreview={bundlePreview}
          setBundlePreview={setBundlePreview}
        />
      )}
    </div>
  );
}