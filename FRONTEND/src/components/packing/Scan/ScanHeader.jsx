import { Scan, Volume2, User, RefreshCw, LayoutDashboard, LogOut } from "lucide-react";

export function ScanHeader({ 
  admin, 
  theme, 
  onShowSoundModal, 
  onNewScan, 
  onDashboard, 
  onLogout,
  isHeaderVisible 
}) {
  if (!isHeaderVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 translate-y-0">
      <div className={`w-full ${theme.bgCard} border-b ${theme.borderColor} shadow-lg px-3 sm:px-4 py-2 sm:py-3`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`bg-gradient-to-r from-${theme.accentColor}-400 to-${theme.accentColor}-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl`}>
              <Scan className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className={`text-base sm:text-lg md:text-xl font-bold ${theme.textColor}`}>
              Order Packing Scanner
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
            <button 
              onClick={onShowSoundModal} 
              className={`px-2 sm:px-3 py-1 sm:py-1.5 ${theme.bgCard} ${theme.textColor} rounded-lg text-xs sm:text-sm border ${theme.borderColor}`}
            >
              <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
              Sounds
            </button>
            {admin && (
              <div className={`px-2 sm:px-3 py-1 sm:py-1.5 ${theme.bgCard} rounded-lg border ${theme.borderColor}`}>
                <User className={`h-3 w-3 sm:h-4 sm:w-4 inline mr-1 ${theme.textMuted}`} />
                <span className={`text-xs sm:text-sm ${theme.textColor}`}>{admin.name}</span>
              </div>
            )}
            <button 
              onClick={onNewScan} 
              className={`px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-${theme.accentColor}-100 to-${theme.accentColor}-600 ${theme.textColor} rounded-lg text-xs sm:text-sm`}
            >
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
              New
            </button>
            <button 
              onClick={onDashboard} 
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-xs sm:text-sm"
            >
              <LayoutDashboard className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
              Dashboard
            </button>
            <button 
              onClick={onLogout} 
              className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-xs sm:text-sm"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}