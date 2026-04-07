import { SKUCard } from "./SKUCard";
import { EmptyState } from "./EmptyState";

export function SKUGridView({ 
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
  if (skus.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skus.map((sku) => (
        <SKUCard 
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
      ))}
    </div>
  );
}