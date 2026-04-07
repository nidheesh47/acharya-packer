import { Package, PackageOpen, CheckCircle } from "lucide-react";

export function RecentItem({ item }) {
  return (
    <div className="group p-3 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`h-12 w-12 rounded-lg overflow-hidden ${
            item.sku_type === 'bundle' 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500'
              : 'bg-gradient-to-br from-blue-500 to-purple-500'
          }`}>
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {item.sku_type === 'bundle' ? (
                  <PackageOpen className="h-5 w-5 text-white" />
                ) : (
                  <Package className="h-5 w-5 text-white" />
                )}
              </div>
            )}
          </div>
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <CheckCircle className="h-2 w-2 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 truncate group-hover:text-purple-700">
            {item.product_name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {item.sku_type === 'bundle' ? 'Bundle' : 'SKU'}: {item.sku}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-gray-400">{item.created}</span>
            {item.auto_created > 0 && (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                +{item.auto_created}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}