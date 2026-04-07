// components/admin-login/TrustIndicators.jsx
import { Users, ShoppingBag, Globe } from "lucide-react";

export const TrustIndicators = () => {
  return (
    <div className="flex items-center space-x-6 pt-4">
      <div className="flex items-center space-x-2">
        <Users className="h-4 w-4 text-amber-500" />
        <span className="text-xs text-gray-600">500+ Active Users</span>
      </div>
      <div className="flex items-center space-x-2">
        <ShoppingBag className="h-4 w-4 text-amber-500" />
        <span className="text-xs text-gray-600">1M+ Orders Processed</span>
      </div>
      <div className="flex items-center space-x-2">
        <Globe className="h-4 w-4 text-amber-500" />
        <span className="text-xs text-gray-600">Global Network</span>
      </div>
    </div>
  );
};