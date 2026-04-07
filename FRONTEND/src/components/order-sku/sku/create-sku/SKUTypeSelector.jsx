import { Package, PackageOpen, CheckCircle, Zap } from "lucide-react";

export function SKUTypeSelector({ skuType, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Layers className="h-4 w-4" />
        SKU Type
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange("simple")}
          className={`p-4 border-2 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 ${
            skuType === "simple"
              ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
              : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/30"
          }`}
        >
          <Package className="h-5 w-5" />
          <span className="font-medium">Simple SKU</span>
          {skuType === "simple" && (
            <CheckCircle className="h-5 w-5 text-purple-600 ml-auto" />
          )}
        </button>
        <button
          type="button"
          onClick={() => onChange("bundle")}
          className={`p-4 border-2 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 ${
            skuType === "bundle"
              ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
              : "border-gray-200 hover:border-purple-200 hover:bg-purple-50/30"
          }`}
        >
          <PackageOpen className="h-5 w-5" />
          <span className="font-medium">Product Bundle</span>
          {skuType === "bundle" && (
            <CheckCircle className="h-5 w-5 text-purple-600 ml-auto" />
          )}
        </button>
      </div>
      {skuType === "bundle" && (
        <div className="flex items-center gap-2 mt-2 text-xs text-purple-600 bg-purple-50 p-3 rounded-lg">
          <Zap className="h-4 w-4" />
          <span>Missing components will be automatically created as simple SKUs</span>
        </div>
      )}
    </div>
  );
}

// Import Layers for the icon
import { Layers } from "lucide-react";