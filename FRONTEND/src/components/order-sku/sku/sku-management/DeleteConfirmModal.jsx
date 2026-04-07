import { AlertCircle, Trash2, Loader2 } from "lucide-react";

export function DeleteConfirmModal({ skuToDelete, actionLoading, handleDelete, setShowConfirm, setSkuToDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Delete SKU</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Are you sure you want to permanently delete <span className="font-bold text-gray-800">{skuToDelete}</span>?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-red-800">This action cannot be undone and will remove the SKU from all orders.</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowConfirm(false);
                setSkuToDelete(null);
              }}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={actionLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}