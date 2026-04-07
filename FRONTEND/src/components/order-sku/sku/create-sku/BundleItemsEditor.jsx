import { Boxes, PlusCircle, Rocket } from "lucide-react";
import { BundleItemRow } from "./BundleItemRow";

export function BundleItemsEditor({ 
  bundleItems, 
  availableSkus,
  loadingSkus,
  searchTerm,
  setSearchTerm,
  showDropdown,
  setShowDropdown,
  showNewSkuForm,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onSelectSku,
  onToggleNewSkuForm
}) {
  return (
    <div className="space-y-4 border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Boxes className="h-4 w-4" />
          Bundle Components
          <span className="text-red-500">*</span>
        </label>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
          {bundleItems.length} item(s)
        </span>
      </div>

      {bundleItems.map((item, index) => (
        <BundleItemRow
          key={index}
          index={index}
          item={item}
          availableSkus={availableSkus}
          loadingSkus={loadingSkus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          showNewSkuForm={showNewSkuForm}
          onUpdate={onUpdateItem}
          onRemove={onRemoveItem}
          onSelectSku={onSelectSku}
          onToggleNewSkuForm={onToggleNewSkuForm}
        />
      ))}

      <button
        type="button"
        onClick={onAddItem}
        className="w-full py-3 border-2 border-dashed border-purple-200 rounded-lg text-purple-600 font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
      >
        <PlusCircle className="h-5 w-5" />
        Add Bundle Component
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Rocket className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-purple-800">Auto-Creation Feature</p>
            <ul className="text-xs text-purple-700 mt-2 space-y-1">
              <li>• If a component SKU doesn't exist, it will be created automatically</li>
              <li>• You can provide product name and image for new components</li>
              <li>• Auto-created SKUs will be simple products</li>
              <li>• Nested bundles are not allowed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}