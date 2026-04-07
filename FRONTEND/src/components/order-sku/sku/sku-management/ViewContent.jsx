import { Edit2, Trash2, Boxes, Eye } from "lucide-react";

export function ViewContent({ sku, isBundle, startEdit, setShowConfirm, setSkuToDelete, setBundlePreview }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 truncate">{sku.sku}</h3>
        {sku.product_name && sku.image_url && (
          <div className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            Complete
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs font-medium text-gray-500 mb-1">Product Name</h4>
        <p className="text-sm text-gray-800">
          {sku.product_name || <span className="text-gray-400 italic">No product name</span>}
        </p>
      </div>

      {isBundle && sku.bundle_items && sku.bundle_items.length > 0 && (
        <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-purple-700 flex items-center gap-1">
              <Boxes className="h-3 w-3" />
              Bundle Components ({sku.bundle_items.length})
            </span>
            <button
              onClick={() => setBundlePreview(sku)}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              View All
            </button>
          </div>
          <div className="space-y-1">
            {sku.bundle_items.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{item.sku}</span>
                <span className="bg-purple-100 px-2 py-0.5 rounded-full text-purple-700 font-medium">x{item.quantity}</span>
              </div>
            ))}
            {sku.bundle_items.length > 2 && (
              <p className="text-xs text-purple-600 text-center mt-1">
                +{sku.bundle_items.length - 2} more items
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={() => startEdit(sku)}
          className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          <Edit2 className="h-4 w-4 inline mr-2" />
          Edit
        </button>
        
        <button
          onClick={() => {
            setSkuToDelete(sku.sku);
            setShowConfirm(true);
          }}
          className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}