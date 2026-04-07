import { Plus, Package, Download } from "lucide-react";

export function SKUCatalogGrid({ 
  skus, onSelectSku, onExport, formatDate 
}) {
  const displayedSkus = skus.slice(0, 12);

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Product Catalog ({skus.length} items)</h3>
        <button
          type="button"
          onClick={onExport}
          className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
        {displayedSkus.map((sku) => (
          <button
            key={sku.sku}
            type="button"
            onClick={() => onSelectSku(sku.sku)}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-2">
              {sku.image_url ? (
                <img
                  src={sku.image_url}
                  alt={sku.product_name || sku.sku}
                  className="w-10 h-10 object-cover rounded"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{sku.sku}</p>
                <p className="text-xs text-gray-500 truncate">{sku.product_name || "No name"}</p>
              </div>
              <Plus className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </button>
        ))}
      </div>
      {skus.length > 12 && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Showing 12 of {skus.length} SKUs. Use search to find more.
        </p>
      )}
    </div>
  );
}