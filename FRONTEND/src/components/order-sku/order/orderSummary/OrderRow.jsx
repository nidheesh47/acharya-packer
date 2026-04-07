import { Calendar, User, Mail, MapPin, DollarSign, Eye, Edit, FileClock, Check } from 'lucide-react';
import { getStatusIcon, getStatusBgColor, getStatusDisplayName, getStatusColor } from '../utils/statusHelpers';
import { formatShortDate, formatTimeAgo } from '../utils/dateHelpers';
import { calculateScanProgress, getRecentScanActivity } from '../utils/orderUtils';

export default function OrderRow({ order, isSelected, onSelect, onView, onEdit, onViewLogs, onQuickAction }) {
  const StatusIcon = getStatusIcon(order.scan_status);
  const progress = calculateScanProgress(order);
  const statusDisplayName = getStatusDisplayName(order.scan_status);
  const allItemsScanned = order.expanded_items?.every(item => item.fully_scanned) || false;
  const recentLogs = getRecentScanActivity({ [order._id]: order.packing_logs || [] }, order._id);

  return (
    <tr className={`hover:bg-indigo-50/30 transition-colors ${isSelected ? "bg-indigo-50 hover:bg-indigo-100" : ""}`}>
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center">
          <button 
            onClick={onSelect} 
            className={`mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 border rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${isSelected ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-600" : "border-slate-300 hover:border-indigo-400"}`}
          >
            {isSelected && <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />}
          </button>
          <div>
            <div className="text-sm font-bold text-indigo-700">{order.order_name}</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatShortDate(order.createdAt)}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />₹{parseFloat(order.total_price || 0).toLocaleString()}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
        <div className="text-sm font-medium text-slate-900">
          <User className="h-4 w-4 inline mr-1 text-slate-400" />
          {order.customer?.first_name} {order.customer?.last_name}
        </div>
        <div className="text-xs text-slate-500 mt-1 flex items-center">
          <Mail className="h-3 w-3 mr-1" />
          <span className="truncate max-w-[150px]">{order.customer?.email || order.email}</span>
        </div>
        <div className="text-xs text-slate-500 mt-1 flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {order.shipping_address?.city || "Unknown location"}
        </div>
      </td>
      
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <StatusIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
            <span className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${getStatusBgColor(order.scan_status)}`}>
              {statusDisplayName}
            </span>
          </div>
          <div className="w-full">
            <div className="flex justify-between text-[10px] sm:text-xs text-slate-600 mb-0.5">
              <span>Scan Progress</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${getStatusColor(order.scan_status)}`} style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
       </td>
      
      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
        <div className="space-y-2">
          {order.tracking?.number ? (
            <div className="text-xs">
              <div className="font-medium text-slate-700">{order.tracking.company}</div>
              <code className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded mt-0.5 block truncate max-w-[150px]">{order.tracking.number}</code>
              <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium mt-1 ${order.tracking?.scan_status === "scanned" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                {order.tracking?.scan_status || "pending"}
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-400 italic">No tracking</span>
          )}
          <div className="text-[10px]">
            <div className={allItemsScanned ? "text-emerald-600" : "text-amber-600"}>
              Items: {allItemsScanned ? "✅ All scanned" : "⚠️ Needs scanning"}
            </div>
          </div>
        </div>
       </td>
      
      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
        <div className="space-y-1">
          {recentLogs.length > 0 ? (
            recentLogs.slice(0, 2).map((log, idx) => (
              <div key={idx} className="text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded">
                {log.title || log.scan_type} • {formatTimeAgo(log.scanned_at)}
              </div>
            ))
          ) : (
            <div className="text-[10px] text-slate-400 italic">No activity</div>
          )}
        </div>
       </td>
      
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="flex gap-1 sm:gap-2">
            <button onClick={onView} className="p-1.5 sm:p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
              <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button onClick={onEdit} className="p-1.5 sm:p-2 text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
              <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button onClick={onViewLogs} className="p-1.5 sm:p-2 text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <FileClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
          <select
            className="text-[10px] py-1 px-1.5 sm:px-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50"
            onChange={(e) => { 
              const action = e.target.value; 
              if (action) { 
                onQuickAction(action); 
                e.target.value = ""; 
              } 
            }}
          >
            <option value="">Quick Actions</option>
            <option value="scan_all_items">📦 Scan All</option>
            <option value="clear_scans">🔄 Clear</option>
            <option value="mark_completed">✅ Complete</option>
          </select>
        </div>
       </td>
    </tr>
  );
}