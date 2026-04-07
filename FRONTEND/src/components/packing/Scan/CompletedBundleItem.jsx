import { Package, Check } from "lucide-react";

export function CompletedBundleItem({ bundle, theme }) {
  return (
    <div className={`p-2 ${theme.scannedBg} rounded-xl border ${theme.successBorder} break-words`}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
          {bundle.image_url ? (
            <img src={bundle.image_url} alt={bundle.product_name} className="w-full h-full object-contain p-1" />
          ) : (
            <Package className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${theme.scannedText} truncate`}>{bundle.product_name}</p>
          <code className={`text-[8px] ${theme.scannedCodeBg} px-1 py-0.5 rounded ${theme.textMuted} break-all`}>{bundle.sku}</code>
        </div>
        <span className={`text-[10px] font-bold ${theme.scannedText} flex-shrink-0`}>
          {bundle.bundle_components?.filter(c => c.fully_scanned).length || 0}/{bundle.bundle_components?.length || 0}
        </span>
      </div>
      <div className="ml-8 space-y-2">
        {bundle.bundle_components?.map((comp, idx) => (
          <div key={idx} className="flex items-center gap-2 flex-wrap">
            <div className="w-6 h-6 bg-white/20 rounded overflow-hidden flex-shrink-0">
              {comp.image_url ? (
                <img src={comp.image_url} className="w-full h-full object-contain p-0.5" />
              ) : (
                <Package className={`w-full h-full p-1 ${comp.fully_scanned ? theme.scannedText : theme.textMuted}`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[9px] font-medium ${comp.fully_scanned ? theme.scannedText : theme.textMuted} truncate`}>
                {comp.product_name}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-1">
                <code className={`text-[7px] ${comp.fully_scanned ? theme.scannedCodeBg : theme.bgCard} px-1 py-0.5 rounded break-all`}>
                  {comp.sku}
                </code>
                <span className={`text-[8px] font-bold ${comp.fully_scanned ? 'text-green-400' : theme.textMuted} flex-shrink-0`}>
                  {comp.scanned_qty || 0}/{comp.ordered_qty || 1}
                </span>
              </div>
            </div>
            {comp.fully_scanned && <Check className="h-3 w-3 text-green-400 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}