import { Tag, PackageOpen, Eye, ExternalLink, ImageIcon, Edit2, Trash2 } from "lucide-react";
import { EditForm } from "./EditForm";
import { BundleItemsEditor } from "./BundleItemsEditor";

export function SKURow({ 
  sku, 
  existingSkus, 
  editingSku, 
  form, 
  setForm, 
  startEdit, 
  handleUpdate, 
  setEditingSku, 
  actionLoading, 
  setShowConfirm, 
  setSkuToDelete, 
  setBundlePreview, 
  checkSkuExists 
}) {
  const isEditing = editingSku === sku.sku;
  const isBundle = sku.sku_type === "bundle";
  const availableSkus = existingSkus.filter(s => s.sku !== sku.sku && s.is_active !== false);
  
  return (
    <tr className={`hover:bg-gray-50 transition-colors ${isBundle && !isEditing ? 'bg-purple-50/30' : ''}`}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-purple-500" />
          <span className="font-mono font-bold text-gray-800">{sku.sku}</span>
          {isBundle && !isEditing && (
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Bundle</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`text-sm font-medium ${isBundle ? 'text-purple-700' : 'text-gray-600'}`}>
          {isBundle ? 'Bundle' : 'Simple'}
        </span>
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <div className="space-y-2">
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              value={form.product_name}
              onChange={(e) => setForm({ ...form, product_name: e.target.value })}
              placeholder="Product name"
            />
            {form.sku_type === "bundle" && (
              <BundleItemsEditor 
                form={form}
                setForm={setForm}
                availableSkus={availableSkus}
                checkSkuExists={checkSkuExists}
              />
            )}
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-800">{sku.product_name || <span className="text-gray-400 italic">No name</span>}</p>
            {isBundle && sku.bundle_items?.length > 0 && (
              <button
                onClick={() => setBundlePreview(sku)}
                className="text-xs text-purple-600 hover:text-purple-700 mt-1 flex items-center gap-1"
              >
                <Eye className="h-3 w-3" />
                View {sku.bundle_items.length} items
              </button>
            )}
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        {sku.image_url ? (
          <div className="flex items-center gap-2">
            <img src={sku.image_url} alt="" className="h-10 w-10 object-cover rounded-lg border border-gray-200" />
            <a href={sku.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="h-5 w-5" />
            </div>
            <span className="text-sm">No image</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={handleUpdate} disabled={actionLoading === sku.sku} className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
              Save
            </button>
            <button onClick={() => setEditingSku(null)} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => startEdit(sku)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Edit2 className="h-4 w-4" />
            </button>
            <button onClick={() => { setSkuToDelete(sku.sku); setShowConfirm(true); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}