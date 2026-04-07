import { LogOut } from "lucide-react";

export function LogoutWarning({ warning }) {
  return (
    <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[95%] sm:max-w-2xl px-2 sm:px-4">
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg sm:rounded-xl shadow-2xl p-4 sm:p-6">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-1.5 sm:p-2 bg-amber-100 rounded-lg">
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-bold text-amber-800 mb-1 sm:mb-2">Security Update</h3>
            <p className="text-xs sm:text-sm text-amber-700 mb-2 sm:mb-3">{warning.message}</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 h-1.5 sm:h-2 bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full animate-shrink"></div>
              </div>
              <span className="text-xs font-medium text-amber-700">Logging out in 3s...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}