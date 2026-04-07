import { MinusCircle, ChevronDown } from "lucide-react";
import { SKUDropdown } from "./SKUDropdown";
import { NewSKUForm } from "./NewSKUForm";

export function BundleItemRow({ 
  index, 
  item, 
  availableSkus,
  loadingSkus,
  searchTerm,
  setSearchTerm,
  showDropdown,
  setShowDropdown,
  showNewSkuForm,
  onUpdate,
  onRemove,
  onSelectSku,
  onToggleNewSkuForm
}) {
  const isDropdownOpen = showDropdown === index;
  const isNewSkuFormOpen = showNewSkuForm === index;

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-all">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={item.sku}
                onChange={(e) => onUpdate(index, 'sku', e.target.value.toUpperCase())}
                onFocus={() => {
                  setShowDropdown(index);
                  setSearchTerm("");
                }}
                placeholder="Enter SKU or select from list"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowDropdown(isDropdownOpen ? null : index)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <SKUDropdown
                  availableSkus={availableSkus}
                  loadingSkus={loadingSkus}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onSelectSku={(sku) => onSelectSku(index, sku)}
                  onToggleNewSkuForm={() => onToggleNewSkuForm(index)}
                />
              )}
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => onUpdate(index, 'quantity', e.target.value)}
              className="w-24 px-3 py-3 border-2 border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <MinusCircle className="h-5 w-5" />
        </button>
      </div>

      {isNewSkuFormOpen && (
        <NewSKUForm
          index={index}
          item={item}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}