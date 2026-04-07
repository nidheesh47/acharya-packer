import { Save, Loader2, X, Boxes } from "lucide-react";
import { BundleItemsEditor } from "./BundleItemsEditor";

export function EditForm({ form, setForm, sku, availableSkus, checkSkuExists, handleUpdate, setEditingSku, actionLoading }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-gray-500">Current SKU</label>
        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" value={form.sku} disabled />
      </div>
      
      <div>
        <label className="text-xs font-medium text-gray-500">New SKU (optional)</label>
        <input
          placeholder="Enter new SKU"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          value={form.new_sku}
          onChange={(e) => setForm({ ...form, new_sku: e.target.value })}
        />
      </div>
      
      <div>
        <label className="text-xs font-medium text-gray-500">Product Name</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          value={form.product_name}
          onChange={(e) => setForm({ ...form, product_name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>
      
      <div>
        <label className="text-xs font-medium text-gray-500">Image URL</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-500">SKU Type</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          value={form.sku_type}
          onChange={(e) => setForm({ ...form, sku_type: e.target.value, bundle_items: [] })}
        >
          <option value="simple">Simple Product</option>
          <option value="bundle">Product Bundle</option>
        </select>
      </div>

      {form.sku_type === "bundle" && (
        <BundleItemsEditor 
          form={form}
          setForm={setForm}
          availableSkus={availableSkus}
          checkSkuExists={checkSkuExists}
        />
      )}
      
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleUpdate}
          disabled={actionLoading === sku.sku}
          className="flex-1 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {actionLoading === sku.sku ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
        <button
          onClick={() => setEditingSku(null)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}