import { Package, Check } from "lucide-react";

export function CompletedItem({ item, theme }) {
  return (
    <div className={`p-2 ${theme.scannedBg} rounded-xl border ${theme.successBorder} break-words`}>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="w-10 h-10 bg-white/20 rounded-lg overflow-hidden flex-shrink-0">
          {item.image_url ? (
            <img src={item.image_url} className="w-full h-full object-contain p-1" />
          ) : (
            <Package className={`w-full h-full p-2 ${theme.scannedText}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${theme.scannedText} truncate`}>
            {item.product_name || "Unknown"}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-1 mt-1">
            <code className={`text-[9px] ${theme.scannedCodeBg} px-1 py-0.5 rounded ${theme.textMuted} break-all`}>
              {item.sku}
            </code>
            <span className={`text-sm font-bold ${item.display_qty === item.total_qty ? 'text-green-400' : theme.scannedText} flex-shrink-0`}>
              {item.display_qty || 0}/{item.total_qty || 1}
            </span>
          </div>
        </div>
        {item.display_qty === item.total_qty ? (
          <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
        ) : (
          <div className="h-4 w-4 rounded-full border-2 border-yellow-400 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}