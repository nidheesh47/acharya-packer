import { SKURow } from "./SKURow";
import { EmptyState } from "./EmptyState";

export function SKUListView({ 
  skus, 
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
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {skus.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              skus.map((sku) => (
                <SKURow 
                  key={sku.sku}
                  sku={sku}
                  existingSkus={existingSkus}
                  editingSku={editingSku}
                  form={form}
                  setForm={setForm}
                  startEdit={startEdit}
                  handleUpdate={handleUpdate}
                  setEditingSku={setEditingSku}
                  actionLoading={actionLoading}
                  setShowConfirm={setShowConfirm}
                  setSkuToDelete={setSkuToDelete}
                  setBundlePreview={setBundlePreview}
                  checkSkuExists={checkSkuExists}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}