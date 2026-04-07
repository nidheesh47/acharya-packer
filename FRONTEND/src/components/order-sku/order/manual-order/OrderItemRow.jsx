import { Trash2, Package } from "lucide-react";

export function OrderItemRow({ 
  item, index, skus, filteredSkus, 
  onUpdate, onRemove, onAddCustom, onSelectFromCatalog,
  formatDate 
}) {
  const skuDetails = skus.find(s => s.sku === item.sku);

  return (
    <div className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all ${
      item.sku ? 'border-gray-200' : 'border-dashed border-gray-300'
    }`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              SKU <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onSelectFromCatalog(index)}
                className={`text-xs px-2 py-1 rounded ${
                  !item.customSku && !item.sku
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                From Catalog
              </button>
              <button
                type="button"
                onClick={() => onAddCustom(index)}
                className={`text-xs px-2 py-1 rounded ${
                  item.customSku 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Custom SKU
              </button>
            </div>
          </div>
          
          {item.customSku ? (
            <input
              placeholder="Enter custom SKU..."
              className="w-full px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              value={item.sku}
              onChange={(e) => onUpdate(index, "sku", e.target.value)}
            />
          ) : (
            <select
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={item.sku}
              onChange={(e) => onUpdate(index, "sku", e.target.value)}
            >
              <option value="">Select a product...</option>
              {filteredSkus.map((s) => (
                <option key={s.sku} value={s.sku}>
                  {s.sku} — {s.product_name || "Unknown"}
                </option>
              ))}
            </select>
          )}

          {skuDetails && (
            <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-3">
                {skuDetails.image_url ? (
                  <img
                    src={skuDetails.image_url}
                    alt=""
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-indigo-100 rounded flex items-center justify-center">
                    <Package className="h-6 w-6 text-indigo-500" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">{skuDetails.product_name || "Unknown Product"}</p>
                  <p className="text-xs text-gray-500">Added: {formatDate(skuDetails.createdAt)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-32">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => onUpdate(index, "quantity", Math.max(1, (item.quantity || 1) - 1))}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-l-lg hover:bg-gray-200"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              className="w-full px-3 py-2 border-t border-b border-gray-200 text-center focus:ring-2 focus:ring-indigo-500"
              value={item.quantity}
              onChange={(e) => onUpdate(index, "quantity", Math.max(1, Number(e.target.value)))}
            />
            <button
              type="button"
              onClick={() => onUpdate(index, "quantity", (item.quantity || 1) + 1)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-r-lg hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRemove(index)}
          disabled={false}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}