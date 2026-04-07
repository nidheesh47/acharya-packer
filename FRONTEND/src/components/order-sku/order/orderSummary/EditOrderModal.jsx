import { useState } from 'react';
import { Package, Truck, Shield, Edit, XCircle, Save, Loader2 } from 'lucide-react';
import { API_BASE } from '../constants/orderConstants';

export default function EditOrderModal({ order, onClose, onSave }) {
  const [editingOrder, setEditingOrder] = useState(order);
  const [saving, setSaving] = useState(false);

  const handleQuantityUpdate = (itemSku, field, value, isBundle = false, componentSku = null) => {
    if (!editingOrder) return;

    const updatedItems = editingOrder.line_items.map(item => {
      if (item.sku === itemSku) {
        if (isBundle && componentSku) {
          const currentValue = parseInt(value) || 0;
          const maxValue = item.quantity;
          const newValue = Math.min(maxValue, Math.max(0, currentValue));
          
          return {
            ...item,
            component_scans: {
              ...item.component_scans,
              [componentSku]: newValue
            }
          };
        } else if (field === "quantity") {
          const newQuantity = Math.max(1, parseInt(value) || 1);
          return { ...item, quantity: newQuantity };
        } else if (field === "scanned_qty") {
          const maxScanned = item.quantity;
          const newScanned = Math.min(maxScanned, Math.max(0, parseInt(value) || 0));
          return { ...item, scanned_qty: newScanned };
        }
      }
      return item;
    });

    setEditingOrder({
      ...editingOrder,
      line_items: updatedItems
    });
  };

  const handleUpdateOrderStatus = async (newStatus) => {
    if (!editingOrder) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem("auth_token");
      
      const res = await fetch(`${API_BASE}/api/order/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: editingOrder._id,
          updates: {
            scan_status: newStatus
          }
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");
      
      setEditingOrder({
        ...editingOrder,
        scan_status: newStatus
      });
      alert("✅ Order status updated");
    } catch (err) {
      console.error("Status update error:", err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveOrderEdits = async () => {
    if (!editingOrder) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem("auth_token");
      
      const updates = {
        line_items: editingOrder.line_items.map(item => {
          if (item.is_bundle || item.component_scans) {
            return {
              sku: item.sku,
              quantity: item.quantity,
              component_scans: item.component_scans
            };
          } else {
            return {
              sku: item.sku,
              quantity: item.quantity,
              scanned_qty: item.scanned_qty || 0
            };
          }
        }),
        scan_status: editingOrder.scan_status
      };
      
      if (editingOrder.tracking) {
        updates.tracking = editingOrder.tracking;
      }
      
      const res = await fetch(`${API_BASE}/api/order/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: editingOrder._id,
          updates: updates
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update order");
      
      alert("✅ Order updated successfully");
      onSave();
      onClose();
    } catch (err) {
      console.error("Save error:", err);
      alert(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <Edit className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Edit Order</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Order: {editingOrder.order_name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Order Status
                </h3>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  value={editingOrder.scan_status}
                  onChange={(e) => handleUpdateOrderStatus(e.target.value)}
                  disabled={saving}
                >
                  <option value="pending">🟡 Pending</option>
                  <option value="items_scanned">🔵 Items Scanned</option>
                  <option value="tracking_label_pending">🟣 Tracking Pending</option>
                  <option value="scanned">🟢 Completed</option>
                  <option value="cancelled">🔴 Cancelled</option>
                </select>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Tracking Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Carrier</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={editingOrder.tracking?.company || ""}
                      onChange={(e) => setEditingOrder({
                        ...editingOrder,
                        tracking: { ...editingOrder.tracking, company: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Tracking Number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={editingOrder.tracking?.number || ""}
                      onChange={(e) => setEditingOrder({
                        ...editingOrder,
                        tracking: { ...editingOrder.tracking, number: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Tracking URL</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={editingOrder.tracking?.url || ""}
                      onChange={(e) => setEditingOrder({
                        ...editingOrder,
                        tracking: { ...editingOrder.tracking, url: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Tracking Scan Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={editingOrder.tracking?.scan_status || "pending"}
                      onChange={(e) => setEditingOrder({
                        ...editingOrder,
                        tracking: { ...editingOrder.tracking, scan_status: e.target.value }
                      })}
                    >
                      <option value="pending">Pending</option>
                      <option value="scanned">Scanned</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Edit Order Items
              </h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {editingOrder.line_items?.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-mono text-sm font-bold text-slate-900">{item.sku}</div>
                        <div className="text-xs text-slate-600">{item.title || "Unknown Product"}</div>
                      </div>
                      {item.component_scans ? (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Bundle</span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Regular</span>
                      )}
                    </div>
                    
                    {item.component_scans ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-medium text-slate-700">Order Quantity:</label>
                          <input
                            type="number"
                            min="1"
                            className="w-20 px-2 py-1 border border-slate-300 rounded-lg text-sm"
                            value={item.quantity}
                            onChange={(e) => handleQuantityUpdate(item.sku, "quantity", e.target.value)}
                          />
                        </div>
                        <div className="pl-3 border-l-2 border-purple-200 space-y-2">
                          <p className="text-xs font-medium text-purple-700">Bundle Components:</p>
                          {Object.entries(item.component_scans).map(([compSku, scannedQty]) => (
                            <div key={compSku} className="flex items-center justify-between gap-3">
                              <span className="text-xs font-mono">{compSku}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-600">Scanned:</span>
                                <input
                                  type="number"
                                  min="0"
                                  max={item.quantity}
                                  className="w-16 px-2 py-1 border border-slate-300 rounded-lg text-sm"
                                  value={scannedQty}
                                  onChange={(e) => handleQuantityUpdate(item.sku, "scanned_qty", e.target.value, true, compSku)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Order Quantity</label>
                          <input
                            type="number"
                            min="1"
                            className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
                            value={item.quantity}
                            onChange={(e) => handleQuantityUpdate(item.sku, "quantity", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Scanned Quantity</label>
                          <input
                            type="number"
                            min="0"
                            max={item.quantity}
                            className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
                            value={item.scanned_qty || 0}
                            onChange={(e) => handleQuantityUpdate(item.sku, "scanned_qty", e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                    
                    {!item.component_scans && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(((item.scanned_qty || 0) / (item.quantity || 1)) * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: `${((item.scanned_qty || 0) / (item.quantity || 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={saveOrderEdits}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center shadow-lg"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}