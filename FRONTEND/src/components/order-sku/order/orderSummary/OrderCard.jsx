import { Calendar, User, Mail, MapPin, Eye, Edit, Check } from 'lucide-react';
import { getStatusIcon, getStatusBgColor, getStatusDisplayName, getStatusColor } from '../utils/statusHelpers';
import { formatShortDate } from '../utils/dateHelpers';
import { calculateScanProgress } from '../utils/orderUtils';

export default function OrderCard({ order, isSelected, onSelect, onView, onEdit, onQuickAction }) {
  const StatusIcon = getStatusIcon(order.scan_status);
  const progress = calculateScanProgress(order);
  const statusDisplayName = getStatusDisplayName(order.scan_status);

  return (
    <div
      className={`bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-3 sm:p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        isSelected ? "ring-2 ring-indigo-500" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1 sm:mb-2">
            <button
              onClick={onSelect}
              className={`mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 border rounded-lg sm:rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                isSelected
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-600"
                  : "border-slate-300 hover:border-indigo-400"
              }`}
            >
              {isSelected && <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />}
            </button>
            <div className="text-sm sm:text-base font-bold text-indigo-700 truncate">{order.order_name}</div>
          </div>
          <div className="text-xs text-slate-500 flex items-center">
            <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
            {formatShortDate(order.createdAt)}
          </div>
        </div>
        <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 flex-shrink-0 ml-2" />
      </div>

      <div className="mb-3 sm:mb-5">
        <div className="flex items-center mb-2">
          <User className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 mr-1.5" />
          <span className="text-xs sm:text-sm font-medium truncate">
            {order.customer?.first_name} {order.customer?.last_name}
          </span>
        </div>
        <div className="text-xs text-slate-600 mb-1 truncate flex items-center">
          <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{order.customer?.email || order.email}</span>
        </div>
        <div className="text-xs text-slate-600 truncate flex items-center">
          <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{order.shipping_address?.city || "Unknown"}</span>
        </div>
      </div>

      <div className="mb-3 sm:mb-5">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-600">Scan Progress</span>
          <span className="font-bold">{progress}%</span>
        </div>
        <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
          <div 
            className={`h-full ${getStatusColor(order.scan_status)}`} 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${getStatusBgColor(order.scan_status)}`}>
          {statusDisplayName}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3 sm:mb-5">
        <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
          <div className="text-slate-500 text-[10px] sm:text-xs">Items</div>
          <div className="font-bold text-sm sm:text-base">{order.line_items?.length || 0}</div>
        </div>
        <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
          <div className="text-slate-500 text-[10px] sm:text-xs">Amount</div>
          <div className="font-bold text-sm sm:text-base">₹{parseFloat(order.total_price || 0).toLocaleString()}</div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <button
          onClick={onView}
          className="flex-1 inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          View
        </button>
        <button
          onClick={onEdit}
          className="flex-1 inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
        >
          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          Edit
        </button>
        <select
          className="text-[10px] sm:text-xs py-1 px-2 sm:py-1.5 sm:px-3 border border-slate-300 rounded-lg bg-white hover:bg-slate-50"
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
          <option value="clear_scans">🔄 Clear Scans</option>
          <option value="mark_completed">✅ Complete</option>
        </select>
      </div>
    </div>
  );
}