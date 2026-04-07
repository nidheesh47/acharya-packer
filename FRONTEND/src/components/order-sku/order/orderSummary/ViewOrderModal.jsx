import { Package, User, Truck, Shield, Edit, XCircle } from 'lucide-react';
import { formatDate } from '../utils/dateHelpers';
import { getStatusBgColor, getStatusDisplayName } from '../utils/statusHelpers';

export default function ViewOrderModal({ order, onClose, onEdit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Order Details</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Order: {order.order_name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors inline-flex items-center"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 rounded-lg">
              <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Customer Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {order.customer?.first_name} {order.customer?.last_name}</p>
                  <p><span className="font-medium">Email:</span> {order.customer?.email || order.email}</p>
                  <p><span className="font-medium">Phone:</span> {order.customer?.phone || "N/A"}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Tracking Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Carrier:</span> {order.tracking?.company || "N/A"}</p>
                  <p><span className="font-medium">Number:</span> {order.tracking?.number || "N/A"}</p>
                  <p><span className="font-medium">Status:</span> {order.tracking?.scan_status || "pending"}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Order Status
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Current Status:</span> 
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${getStatusBgColor(order.scan_status)}`}>
                      {getStatusDisplayName(order.scan_status)}
                    </span>
                  </p>
                  <p><span className="font-medium">Created:</span> {formatDate(order.createdAt)}</p>
                  <p><span className="font-medium">Total Amount:</span> ₹{parseFloat(order.total_price || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                <Package className="h-4 w-4 mr-2" />
                Order Items
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {order.line_items?.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-mono text-sm font-bold text-slate-900">{item.sku}</div>
                        <div className="text-xs text-slate-600">{item.title || "Unknown Product"}</div>
                      </div>
                      {item.component_scans ? (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Bundle</span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {item.scan?.scanned_qty || 0}/{item.quantity || 1} scanned
                        </span>
                      )}
                    </div>
                    {item.component_scans ? (
                      <div className="mt-2 pl-3 border-l-2 border-purple-200 space-y-2">
                        <p className="text-xs font-medium text-purple-700">Components:</p>
                        {Object.entries(item.component_scans).map(([compSku, scannedQty]) => (
                          <div key={compSku} className="flex justify-between text-xs">
                            <span>{compSku}</span>
                            <span className="font-medium">{scannedQty} scanned</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(((item.scan?.scanned_qty || 0) / (item.quantity || 1)) * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: `${((item.scan?.scanned_qty || 0) / (item.quantity || 1)) * 100}%` }}
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

        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-slate-50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}