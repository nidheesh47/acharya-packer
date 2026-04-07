import { Package, Truck, Activity, User, FileClock, XCircle } from 'lucide-react';
import { formatFullDateTime } from '../utils/dateHelpers';

export default function AuditLogsModal({ order, logs, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <FileClock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Audit Logs</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">Order: {order.order_name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {logs.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {logs.map((log, index) => (
                <div key={index} className="border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-0">
                      {log.scan_type === "sku" ? 
                        <Package className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" /> : 
                        log.scan_type === "tracking" ? 
                        <Truck className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" /> : 
                        <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                      }
                      <span className="font-medium text-slate-900 text-xs sm:text-sm">{log.title || log.scan_type}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-500">{formatFullDateTime(log.scanned_at)}</span>
                  </div>
                  <div className="text-xs text-slate-600 mb-1.5">
                    {log.action === "scan" && `Scanned ${log.new_qty || 1} items`}
                    {log.action === "update" && "Updated tracking"}
                    {log.action === "cancel" && "Cancelled order"}
                    {log.action === "clear" && "Cleared scans"}
                    {log.action === "edit" && "Order edited"}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center">
                    <User className="h-2.5 w-2.5 mr-1" />
                    By: {log.scanned_by?.name || "System"} ({log.scanned_by?.role || "system"})
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <FileClock className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-slate-300" />
              <p className="text-base sm:text-lg font-medium text-slate-900">No audit logs found</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">No activity has been recorded for this order yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}