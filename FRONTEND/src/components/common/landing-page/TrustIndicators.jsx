import { Star, Users, CheckCircle } from "lucide-react";

export function TrustIndicators() {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8 pt-4">
      <div className="flex items-center space-x-2">
        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
        <span className="text-sm text-gray-600">4.9/5 Rating</span>
      </div>
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-yellow-500" />
        <span className="text-sm text-gray-600">500+ Active Users</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-5 w-5 text-yellow-500" />
        <span className="text-sm text-gray-600">99.9% Uptime</span>
      </div>
    </div>
  );
}