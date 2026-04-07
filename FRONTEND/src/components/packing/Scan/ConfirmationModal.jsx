export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  icon: Icon,
  theme 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className={`bg-gradient-to-r from-${theme.accentColor}-100 to-${theme.accentColor}-300 p-6 text-center`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white/80 text-sm">{message}</p>
        </div>
        <div className="p-6 flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className={`flex-1 px-4 py-2 bg-gradient-to-r from-${theme.accentColor}-100 to-${theme.accentColor}-400 text-white rounded-lg font-medium`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}