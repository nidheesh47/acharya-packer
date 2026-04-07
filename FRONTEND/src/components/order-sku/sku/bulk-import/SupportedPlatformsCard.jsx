// components/bulk-import/SupportedPlatformsCard.jsx
import { Globe, ShoppingBag } from "lucide-react";

export const SupportedPlatformsCard = () => {
  const platforms = [
    { name: 'Amazon', color: 'from-orange-500 to-amber-500' },
    { name: 'Shopify', color: 'from-green-500 to-emerald-500' },
    { name: 'Vendor', color: 'from-blue-500 to-cyan-500' },
    { name: 'Walmart', color: 'from-blue-600 to-blue-700' },
    { name: 'eBay', color: 'from-blue-400 to-indigo-500' },
    { name: 'Custom', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <Globe className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Supported Platforms</h3>
          <p className="text-xs text-gray-500">Integrate with major platforms</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((platform, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className={`p-1.5 bg-gradient-to-r ${platform.color} rounded-lg`}>
              <ShoppingBag className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700">{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};