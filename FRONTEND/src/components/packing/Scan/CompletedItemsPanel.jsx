import { CheckCircle, Package } from "lucide-react";
import { CompletedItem } from "./CompletedItem";
import { CompletedBundleItem } from "./CompletedBundleItem";

export function CompletedItemsPanel({ scannedItems, theme }) {
  return (
    <div className={`${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} h-auto lg:h-[calc(100vh-100px)] overflow-hidden sticky top-4`}>
      <div className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-2 sm:p-3`}>
        <h3 className="text-white font-bold flex items-center text-sm sm:text-base">
          <CheckCircle className="h-4 w-4 mr-2" />
          Completed Items
        </h3>
        <p className="text-white/80 text-[10px] sm:text-xs">
          {scannedItems.length} items scanned
        </p>
      </div>
      <div className="overflow-y-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[calc(100%-80px)] p-2 sm:p-3 space-y-2">
        {scannedItems.length > 0 ? (
          scannedItems.map((item, idx) => 
            item.is_bundle ? (
              <CompletedBundleItem key={idx} bundle={item} theme={theme} />
            ) : (
              <CompletedItem key={idx} item={item} theme={theme} />
            )
          )
        ) : (
          <div className="text-center py-6">
            <Package className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No items scanned yet</p>
          </div>
        )}
      </div>
    </div>
  );
}