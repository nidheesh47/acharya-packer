import { Package, CheckCircle } from "lucide-react";
import { PendingItem } from "./PendingItem";
import { PendingBundleItem } from "./PendingBundleItem";

export function PendingItemsPanel({ 
  items, 
  expandedBundles, 
  onToggleBundle, 
  theme 
}) {
  const pendingItems = items?.filter(i => 
    i.is_bundle ? i.bundle_components?.some(c => !c.fully_scanned) : !i.fully_scanned
  ) || [];

  return (
    <div className={`${theme.bgCard} rounded-xl shadow-2xl border ${theme.borderColor} h-auto lg:h-[calc(100vh-100px)] overflow-hidden sticky top-4`}>
      <div className={`bg-gradient-to-r from-${theme.accentColor}-500 to-${theme.accentColor}-600 p-2 sm:p-3`}>
        <h3 className="text-white font-bold flex items-center text-sm sm:text-base">
          <Package className="h-4 w-4 mr-2" />
          Pending Items
        </h3>
        <p className="text-white/80 text-[10px] sm:text-xs">
          {pendingItems.length} left
        </p>
      </div>
      <div className="overflow-y-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[calc(100%-80px)] p-2 sm:p-3 space-y-2">
        {pendingItems.length > 0 ? (
          pendingItems.map((item, idx) => {
            if (item.is_bundle) {
              return (
                <PendingBundleItem
                  key={idx}
                  item={item}
                  isExpanded={expandedBundles[item.sku]}
                  onToggle={onToggleBundle}
                  theme={theme}
                />
              );
            }
            return <PendingItem key={idx} item={item} theme={theme} />;
          })
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">All items scanned!</p>
          </div>
        )}
      </div>
    </div>
  );
}