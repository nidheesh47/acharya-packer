import { useCreateSKU } from "../hooks/useCreateSKU";
import { CreateSKUHeader } from "./CreateSKUHeader";
import { SKUTypeSelector } from "./SKUTypeSelector";
import { SKUFormFields } from "./SKUFormFields";
import { BundleItemsEditor } from "./BundleItemsEditor";
import { ImagePreview } from "./ImagePreview";
import { StatusMessages } from "./StatusMessages";
import { SubmitButton } from "./SubmitButton";
import { GuidelinesCard } from "./GuidelinesCard";
import { PlatformStats } from "./PlatformStats";
import { RecentItemsCard } from "./RecentItemsCard";

export default function CreateSKU() {
  const {
    sku, setSku,
    productName, setProductName,
    imageUrl, setImageUrl,
    skuType, setSkuType,
    bundleItems,
    loading,
    error,
    success,
    previewUrl,
    recentSkus,
    imageLoading,
    imageError,
    autoCreateResult,
    availableSkus,
    loadingSkus,
    searchTerm, setSearchTerm,
    showDropdown, setShowDropdown,
    showNewSkuForm,
    mounted,
    addBundleItem,
    removeBundleItem,
    updateBundleItem,
    selectSkuFromList,
    toggleNewSkuForm,
    handleSubmit,
    clearForm,
    filteredAvailableSkus
  } = useCreateSKU();

  return (
    <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <CreateSKUHeader skuType={skuType} onClearForm={clearForm} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500"></div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-2 rounded-lg">
                      <Plus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
                      <p className="text-sm text-gray-500">Fill in all required information below</p>
                    </div>
                  </div>

                  <StatusMessages 
                    error={error}
                    success={success}
                    autoCreateResult={autoCreateResult}
                  />

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <SKUTypeSelector skuType={skuType} onChange={setSkuType} />
                    
                    <SKUFormFields 
                      skuType={skuType}
                      sku={sku}
                      onSkuChange={setSku}
                      productName={productName}
                      onProductNameChange={setProductName}
                      imageUrl={imageUrl}
                      onImageUrlChange={setImageUrl}
                      disabled={loading}
                    />

                    {skuType === "bundle" && (
                      <BundleItemsEditor 
                        bundleItems={bundleItems}
                        availableSkus={availableSkus}
                        loadingSkus={loadingSkus}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        showNewSkuForm={showNewSkuForm}
                        onAddItem={addBundleItem}
                        onRemoveItem={removeBundleItem}
                        onUpdateItem={updateBundleItem}
                        onSelectSku={selectSkuFromList}
                        onToggleNewSkuForm={toggleNewSkuForm}
                      />
                    )}

                    <ImagePreview 
                      previewUrl={previewUrl}
                      imageLoading={imageLoading}
                      imageError={imageError}
                    />

                    <SubmitButton 
                      loading={loading}
                      skuType={skuType}
                      disabled={imageError}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <GuidelinesCard skuType={skuType} />
            <PlatformStats />
            <RecentItemsCard recentSkus={recentSkus} />
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

// Import Plus for the header
import { Plus } from "lucide-react";