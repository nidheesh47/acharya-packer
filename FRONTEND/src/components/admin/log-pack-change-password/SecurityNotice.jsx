// components/change-password/SecurityNotice.jsx
import { Shield } from "lucide-react";

export const SecurityNotice = () => {
  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
      <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-800">🔒 Security Information</p>
          <p className="text-xs text-gray-600 mt-0.5 sm:mt-1">
            After updating your password, you'll be automatically signed out for security reasons. 
            Please sign in again with your new credentials.
          </p>
        </div>
      </div>
    </div>
  );
};