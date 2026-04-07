import { Zap, CheckCircle, Check, RefreshCw, XCircle, Clock, X } from 'lucide-react';
import { BULK_ACTIONS } from '../constants/orderConstants';

export default function BulkActionsModal({ selectedCount, onAction, onClose, loading }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'CheckCircle': return CheckCircle;
      case 'Check': return Check;
      case 'RefreshCw': return RefreshCw;
      case 'XCircle': return XCircle;
      case 'Clock': return Clock;
      default: return Zap;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Bulk Actions</h2>
              <p className="text-sm text-slate-600 mt-1">{selectedCount} orders selected</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          {BULK_ACTIONS.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <button
                key={item.action}
                onClick={() => onAction(item.action)}
                disabled={loading}
                className={`w-full inline-flex items-center justify-between px-4 py-3 text-sm font-medium text-${item.color}-700 bg-${item.color}-50 rounded-xl hover:bg-${item.color}-100 transition-colors disabled:opacity-50`}
              >
                <div className="flex items-center">
                  <Icon className={`h-4 w-4 mr-3 text-${item.color}-600`} />
                  <span>{item.label}</span>
                </div>
                <span className={`text-xs bg-${item.color}-100 text-${item.color}-800 px-2 py-1 rounded`}>
                  {item.desc}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex justify-end">
            <button 
              onClick={onClose} 
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}