import { Package } from "lucide-react";

export function PendingItem({ item, theme }) {
  return (
    <div data-sku={item.sku} className={`p-2 rounded-xl border ${theme.borderColor} ${theme.bgCard} break-words`}>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="w-8 h-8 bg-white/10 rounded overflow-hidden flex-shrink-0">
          {item.image_url ? (
            <img src={item.image_url} className="w-full h-full object-contain p-1" />
          ) : (
            <Package className="w-full h-full p-1 text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${theme.textColor} truncate`}>
            {item.product_name || "Unknown"}
          </p>
          <code className={`text-[8px] ${theme.bgCard} px-1 py-0.5 rounded ${theme.textMuted} break-all`}>
            {item.sku}
          </code>
        </div>
        <span className={`text-sm font-bold ${theme.textColor} flex-shrink-0`}>
          {item.scanned_qty || 0}/{item.ordered_qty || 1}
        </span>
      </div>
    </div>
  );
}