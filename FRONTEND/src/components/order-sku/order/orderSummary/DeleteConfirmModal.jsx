import { useState } from 'react';
import { AlertCircle, Package, Trash2, Loader2 } from 'lucide-react';
import { API_BASE } from '../constants/orderConstants';

export default function DeleteConfirmModal({ order, onConfirm, onClose }) {
  const [saving, setSaving] = useState(false);

  const deleteOrder = async () => {
    if (!order) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`${API_BASE}/api/order/hard-delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_name: order.order_name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      alert(`🗑 Order deleted successfully (${data.deleted_logs || 0} logs removed)`);
      onConfirm();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-rose-100 p-3 rounded-xl">
            <AlertCircle className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Delete Order</h2>
            <p className="text-sm text-slate-600 mt-1">This action cannot be undone</p>
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
          <div className="flex items-center">
            <Package className="h-5 w-5 text-rose-600 mr-3" />
            <div>
              <p className="font-medium text-slate-900">Order: {order?.order_name}</p>
              <p className="text-sm text-slate-600 mt-1">Are you sure you want to permanently delete this order?</p>
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
            onClick={deleteOrder} 
            disabled={saving} 
            className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl hover:from-rose-600 hover:to-rose-700 transition-colors disabled:opacity-50 flex items-center shadow-lg"
          >
            {saving ? 
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Deleting...</> : 
              <><Trash2 className="h-4 w-4 mr-2" /> Delete Order</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}