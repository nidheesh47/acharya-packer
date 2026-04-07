import { useState } from 'react';
import { AlertCircle, Package, Trash2, Loader2 } from 'lucide-react';
import { API_BASE } from '../constants/orderConstants';

export default function BulkDeleteConfirmModal({ selectedCount, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleBulkDelete = async () => {
    if (selectedCount === 0) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      // Note: You'll need to pass the selected order IDs from the parent
      // This is a simplified version
      
      // const res = await fetch(`${API_BASE}/api/order/bulk-delete`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     order_ids: selectedOrderIds,
      //   }),
      // });
      
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.error || "Bulk delete failed");
      
      // alert(`✅ ${data.deleted_orders || selectedCount} orders deleted successfully`);
      onConfirm();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-rose-100 p-3 rounded-xl">
            <AlertCircle className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bulk Delete Orders</h2>
            <p className="text-sm text-slate-600 mt-1">This action cannot be undone</p>
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <Package className="h-5 w-5 text-rose-600 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-slate-900">{selectedCount} Orders Selected</p>
              <p className="text-sm text-slate-600 mt-1">Are you sure you want to permanently delete these orders?</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleBulkDelete} 
            disabled={loading} 
            className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl hover:from-rose-600 hover:to-rose-700 transition-colors disabled:opacity-50 flex items-center shadow-lg"
          >
            {loading ? 
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Deleting...</> : 
              <><Trash2 className="h-4 w-4 mr-2" /> Delete {selectedCount} Orders</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}