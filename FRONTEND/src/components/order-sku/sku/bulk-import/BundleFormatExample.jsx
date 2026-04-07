// components/bulk-import/BundleFormatExample.jsx
import { PackageOpen } from "lucide-react";

export const BundleFormatExample = () => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <PackageOpen className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-purple-800 text-sm mb-2">Bundle Format</p>
          <div className="bg-white p-2 rounded-lg border border-purple-200 mb-2">
            <code className="text-purple-700 font-mono text-xs">SKU1:2|SKU2:1|SKU3:3</code>
          </div>
          <p className="text-xs text-purple-700">
            Format: <span className="font-mono">SKU:quantity</span> separated by <span className="font-mono">|</span>
          </p>
        </div>
      </div>
    </div>
  );
};