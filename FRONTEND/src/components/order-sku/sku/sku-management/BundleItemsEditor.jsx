import { X, Plus, CheckCircle, Sparkles, Info, Boxes } from "lucide-react";

export function BundleItemsEditor({ form, setForm, availableSkus, checkSkuExists }) {
  return (
    <div className="space-y-2 mt-2">
      <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
        <Boxes className="h-3 w-3" />
        Bundle Components
      </label>
      
      {form.bundle_items.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                list={`bundle-skus-${index}`}
                placeholder="Search or enter SKU"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
                value={item.sku}
                onChange={(e) => {
                  const updated = [...form.bundle_items];
                  updated[index].sku = e.target.value.toUpperCase();
                  setForm({ ...form, bundle_items: updated });
                }}
              />
              <datalist id={`bundle-skus-${index}`}>
                {availableSkus.map(s => (
                  <option key={s.sku} value={s.sku}>{s.product_name || s.sku}</option>
                ))}
              </datalist>
            </div>
            <input
              type="number"
              min="1"
              className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={item.quantity}
              onChange={(e) => {
                const updated = [...form.bundle_items];
                updated[index].quantity = Number(e.target.value);
                setForm({ ...form, bundle_items: updated });
              }}
            />
            <button
              onClick={() => {
                const updated = form.bundle_items.filter((_, i) => i !== index);
                setForm({ ...form, bundle_items: updated });
              }}
              className="px-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {item.sku && (
            <div className="ml-1">
              {checkSkuExists(item.sku) ? (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>Existing SKU</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <Sparkles className="h-3 w-3" />
                  <span>Will be auto-created</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      
      <button
        onClick={() => setForm({
          ...form,
          bundle_items: [...form.bundle_items, { sku: "", quantity: 1 }],
        })}
        className="w-full py-2 border-2 border-dashed border-purple-200 rounded-lg text-purple-600 text-sm font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Component
      </button>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            New SKUs will be auto-created with default values
          </p>
        </div>
      </div>
    </div>
  );
}