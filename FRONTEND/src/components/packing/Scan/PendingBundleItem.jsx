import { Package, ChevronRight } from "lucide-react";

export function PendingBundleItem({ 
  item, 
  isExpanded, 
  onToggle, 
  theme 
}) {
  const pending = item.bundle_components?.filter(c => !c.fully_scanned) || [];
  const total = item.bundle_components?.length || 0;
  const scanned = item.bundle_components?.filter(c => c.fully_scanned).length || 0;

  return (
    <div className={`p-2 rounded-xl border ${theme.borderColor} ${theme.bgCard} break-words`}>
      <div className="flex items-center gap-2 cursor-pointer flex-wrap" onClick={() => onToggle(item.sku)}>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
          {item.image_url ? (
            <img src={item.image_url} className="w-full h-full object-contain p-1" />
          ) : (
            <Package className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${theme.textColor} truncate`}>{item.product_name}</p>
          <code className={`text-[8px] ${theme.bgCard} px-1 py-0.5 rounded ${theme.textMuted} break-all`}>{item.sku}</code>
        </div>
        <span className={`text-sm font-bold ${theme.textColor} flex-shrink-0`}>{scanned}/{total}</span>
        <ChevronRight className={`h-3 w-3 ${theme.textMuted} flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
      </div>
      {isExpanded && (
        <div className="mt-2 space-y-1">
          {pending.map((comp, ci) => (
            <div key={ci} data-sku={comp.sku} className={`p-1.5 rounded-lg border ${theme.borderColor} break-words`}>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-6 h-6 bg-white/10 rounded overflow-hidden flex-shrink-0">
                  {comp.image_url ? (
                    <img src={comp.image_url} className="w-full h-full object-contain p-0.5" />
                  ) : (
                    <Package className="w-full h-full p-1 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] ${theme.textColor} truncate`}>{comp.product_name}</p>
                  <code className={`text-[7px] ${theme.bgCard} px-1 rounded break-all`}>{comp.sku}</code>
                </div>
                <span className={`text-sm font-bold ${theme.textColor} flex-shrink-0`}>
                  {comp.scanned_qty || 0}/{comp.ordered_qty || 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}