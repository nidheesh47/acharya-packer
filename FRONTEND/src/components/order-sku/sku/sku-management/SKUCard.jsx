import { Package, PackageOpen, Tag, Edit2, Trash2, Eye, Boxes } from "lucide-react";
import { EditForm } from "./EditForm";
import { ViewContent } from "./ViewContent";

export function SKUCard({ 
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
    <div className={`group bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
      isEditing ? 'border-purple-300 ring-2 ring-purple-200' : 'border-gray-200'
    } ${isBundle && !isEditing ? 'border-l-4 border-l-purple-500' : ''}`}>
      {/* Image Section */}
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        {sku.image_url ? (
          <img
            src={sku.image_url}
            alt={sku.product_name || sku.sku}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {isBundle && !isEditing && (
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <PackageOpen className="h-3 w-3" />
              Bundle
            </div>
          )}
          {sku.product_name && sku.image_url && !isEditing && (
            <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
              Complete
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        {isEditing ? (
          <EditForm 
            form={form}
            setForm={setForm}
            sku={sku}
            availableSkus={availableSkus}
            checkSkuExists={checkSkuExists}
            handleUpdate={handleUpdate}
            setEditingSku={setEditingSku}
            actionLoading={actionLoading}
          />
        ) : (
          <ViewContent 
            sku={sku}
            isBundle={isBundle}
            startEdit={startEdit}
            setShowConfirm={setShowConfirm}
            setSkuToDelete={setSkuToDelete}
            setBundlePreview={setBundlePreview}
          />
        )}
      </div>
    </div>
  );
}