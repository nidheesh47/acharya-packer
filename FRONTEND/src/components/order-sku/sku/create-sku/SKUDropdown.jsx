import { Search, Loader2, Package, Wand2 } from "lucide-react";

export function SKUDropdown({ 
  availableSkus, 
  loadingSkus, 
  searchTerm, 
  setSearchTerm, 
  onSelectSku, 
  onToggleNewSkuForm 
}) {
  const filteredSkus = availableSkus.filter(s => 
    s.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
      <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SKUs..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      
      <button
        type="button"
        onClick={onToggleNewSkuForm}
        className="w-full px-4 py-3 text-left hover:bg-purple-50 flex items-center gap-3 border-b border-gray-100"
      >
        <div className="p-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded">
          <Wand2 className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-medium text-purple-700">Create New SKU</p>
          <p className="text-xs text-gray-500">Add a new component SKU</p>
        </div>
      </button>
      
      {loadingSkus ? (
        <div className="p-4 text-center">
          <Loader2 className="h-5 w-5 animate-spin text-purple-600 mx-auto" />
        </div>
      ) : filteredSkus.length > 0 ? (
        filteredSkus.map((skuItem) => (
          <button
            key={skuItem.sku}
            type="button"
            onClick={() => onSelectSku(skuItem)}
            className="w-full px-4 py-3 text-left hover:bg-purple-50 flex items-center gap-3 border-b border-gray-50 last:border-0"
          >
            {skuItem.image_url ? (
              <img
                src={skuItem.image_url}
                alt={skuItem.product_name}
                className="h-8 w-8 rounded object-cover"
              />
            ) : (
              <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                <Package className="h-4 w-4 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{skuItem.sku}</p>
              <p className="text-xs text-gray-500 truncate">{skuItem.product_name}</p>
            </div>
          </button>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          No SKUs available
        </div>
      )}
    </div>
  );
}