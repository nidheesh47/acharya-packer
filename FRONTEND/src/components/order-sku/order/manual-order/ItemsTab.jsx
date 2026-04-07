import { Plus } from "lucide-react";
import { SKUSearchBar } from "./SKUSearchBar";
import { SKUCatalogGrid } from "./SKUCatalogGrid";
import { OrderItemRow } from "./OrderItemRow";

export function ItemsTab({
  skus,
  filteredSkus,
  items,
  searchTerm, onSearchChange,
  skuFilter, onFilterChange,
  showSkuPreview, onTogglePreview,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onAddProductFromCatalog,
  onAddCustomSku,
  onSelectFromCatalog,
  onExportSku,
  formatDate
}) {
  return (
    <div className="space-y-6">
      <SKUSearchBar 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        skuFilter={skuFilter}
        onFilterChange={onFilterChange}
        showPreview={showSkuPreview}
        onTogglePreview={onTogglePreview}
      />

      {showSkuPreview && (
        <SKUCatalogGrid 
          skus={filteredSkus}
          onSelectSku={onAddProductFromCatalog}
          onExport={onExportSku}
          formatDate={formatDate}
        />
      )}

      <div className="space-y-4">
        {items.map((item, i) => (
          <OrderItemRow
            key={i}
            item={item}
            index={i}
            skus={skus}
            filteredSkus={filteredSkus}
            onUpdate={onUpdateItem}
            onRemove={onRemoveItem}
            onAddCustom={onAddCustomSku}
            onSelectFromCatalog={onSelectFromCatalog}
            formatDate={formatDate}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAddItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition flex items-center justify-center gap-2 text-gray-600 hover:text-indigo-600"
      >
        <Plus className="h-5 w-5" />
        Add Another Item
      </button>
    </div>
  );
}