import { Shield, LogOut } from "lucide-react";

export function SecurityNotice() {
  return (
    <div className="mt-6 sm:mt-8 bg-amber-50 border border-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <div className="flex items-start gap-2 sm:gap-4">
        <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
          <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm sm:text-lg font-bold text-amber-800 mb-1 sm:mb-2">Security Guidelines</h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-amber-700">
            <li className="flex items-start gap-1.5 sm:gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1 sm:mt-1.5"></div>
              <span>Only admins can edit their own profile information</span>
            </li>
            <li className="flex items-start gap-1.5 sm:gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1 sm:mt-1.5"></div>
              <span>Deleting a user will permanently remove their access</span>
            </li>
            <li className="flex items-start gap-1.5 sm:gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1 sm:mt-1.5"></div>
              <span>Regularly review user permissions and access levels</span>
            </li>
            <li className="flex items-start gap-1.5 sm:gap-2 font-semibold">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 mt-1 sm:mt-1.5"></div>
              <span>⚠️ Updating Email, Shop Domain, Webhook Secret, or Password will log you out from all sessions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}