import { useNavigate } from "react-router";
import { useManualOrder } from "../hooks/useManualOrder";
import { ManualOrderHeader } from "./ManualOrderHeader";
import { StatusMessages } from "./StatusMessages";
import { OrderFormTabs } from "./OrderFormTabs";
import { OrderInfoTab } from "./OrderInfoTab";
import { TrackingInfoTab } from "./TrackingInfoTab";
import { ItemsTab } from "./ItemsTab";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { SKUStatsCard } from "./SKUStatsCard";
import { HelpCard } from "./HelpCard";
import { SubmitButton } from "./SubmitButton";

export default function ManualOrderAddPage() {
  const navigate = useNavigate();
  const {
    skus,
    filteredSkus,
    loading,
    submitting,
    searchTerm, setSearchTerm,
    skuFilter, setSkuFilter,
    orderError,
    orderSuccess,
    showSkuPreview, setShowSkuPreview,
    skuStats,
    activeTab, setActiveTab,
    order, setOrder,
    items,
    totals,
    addItem,
    removeItem,
    updateItem,
    addProductFromCatalog,
    addCustomSku,
    selectFromCatalog,
    handleSubmit,
    exportSkuList,
    formatDate
  } = useManualOrder();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-lg p-8 text-center w-80">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-white animate-spin" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Loading Catalog
          </h3>
          <p className="text-sm text-gray-500">Preparing product database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <ManualOrderHeader 
          onBack={() => navigate(-1)}
          order={order}
          setOrder={setOrder}
          totals={totals}
        />

        <StatusMessages error={orderError} success={orderSuccess} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Order Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <OrderFormTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                itemCount={items.filter(i => i.sku).length}
              />

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === "order" && (
                    <OrderInfoTab order={order} setOrder={setOrder} />
                  )}

                  {activeTab === "tracking" && (
                    <TrackingInfoTab order={order} setOrder={setOrder} />
                  )}

                  {activeTab === "items" && (
                    <ItemsTab
                      skus={skus}
                      filteredSkus={filteredSkus}
                      items={items}
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      skuFilter={skuFilter}
                      onFilterChange={setSkuFilter}
                      showSkuPreview={showSkuPreview}
                      onTogglePreview={() => setShowSkuPreview(!showSkuPreview)}
                      onAddItem={addItem}
                      onRemoveItem={removeItem}
                      onUpdateItem={updateItem}
                      onAddProductFromCatalog={addProductFromCatalog}
                      onAddCustomSku={addCustomSku}
                      onSelectFromCatalog={selectFromCatalog}
                      onExportSku={exportSkuList}
                      formatDate={formatDate}
                    />
                  )}

                  <SubmitButton submitting={submitting} />
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            <OrderSummaryCard totals={totals} items={items} />
            <SKUStatsCard stats={skuStats} />
            <HelpCard />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          input, button, select, textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

import { Sparkles } from "lucide-react";