import { Award } from "lucide-react";

export function SuccessModal({ completedOrder, scannedItems, theme, onClose, onNewScan }) {
  if (!completedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className={`bg-gradient-to-r from-${theme.accentColor}-100 to-${theme.accentColor}-200 p-6 text-center`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Order Complete!</h2>
          <p className="text-white/80">Successfully scanned and packed</p>
        </div>
        <div className="p-6">
          <p className="text-3xl font-bold text-center text-gray-900 mb-2 break-words">
            {completedOrder.order_name}
          </p>
          <p className="text-center text-gray-600 mb-4">has been completely scanned and packed</p>
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between mb-2 flex-wrap gap-2">
              <span className="text-sm text-gray-600">Items scanned:</span>
              <span className="font-bold text-green-700">
                {scannedItems.length}/{completedOrder.items?.length || 0}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 h-2.5 rounded-full`} 
                style={{ width: '100%' }} 
              />
            </div>
          </div>
          <button 
            onClick={onNewScan} 
            className={`w-full py-3 bg-gradient-to-r from-${theme.accentColor}-600 to-${theme.accentColor}-700 text-white rounded-xl font-medium`}
          >
            Start New Scan
          </button>
        </div>
      </div>
    </div>
  );
}