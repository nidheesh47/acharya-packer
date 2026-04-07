// components/admin-login/BrandingSection.jsx
import { Sparkles, CheckCircle } from "lucide-react";

export const BrandingSection = () => {
  return (
    <div className="hidden lg:block space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
        <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
        <span className="text-sm font-medium text-gray-700">Enterprise Edition v2.0</span>
      </div>
      
      {/* Main Title */}
      <div className="space-y-4">
        <h1 className="text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
          Order Packing
          <span className="block bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
            Scanner System
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
          Streamline your warehouse operations with intelligent scanning, 
          real-time tracking, and comprehensive analytics.
        </p>
        <div className="flex items-start space-x-2 text-gray-600">
          <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            Trusted by leading logistics companies worldwide for reliable, 
            high-performance order processing.
          </p>
        </div>
      </div>
    </div>
  );
};