// components/admin-login/SecurityNotice.jsx
import { Shield } from "lucide-react";

export const SecurityNotice = () => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-start space-x-3">
        <Shield className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium text-gray-700">🔐 Secure Access</p>
          <p className="text-[10px] text-gray-500 mt-1">
            This area is restricted to authorized personnel only. All activities are monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
};