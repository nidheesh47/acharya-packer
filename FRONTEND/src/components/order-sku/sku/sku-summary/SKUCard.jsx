// components/sku-summary/SKUCard.jsx
import { Package } from "lucide-react";
import { getSKUStatus } from "../utils/skuUtils";

export const SKUCard = ({ sku, ordered, packed, pending }) => {
  const percent = ordered > 0 ? Math.round((packed / ordered) * 100) : 0;
  const status = getSKUStatus(percent);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-5">
        {/* SKU Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Package className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <code className="font-mono font-bold text-gray-800 text-base">
              {sku}
            </code>
            <div className="text-xs text-gray-500">SKU Identifier</div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
              status === "complete"
                ? "bg-emerald-100 text-emerald-700"
                : status === "progress"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-rose-100 text-rose-700"
            }`}
          >
            {status === "complete"
              ? "✓ Complete"
              : status === "progress"
                ? "⏳ In Progress"
                : "⚠ Attention"}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Ordered</div>
            <div className="text-xl font-bold text-blue-700">
              {ordered.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400">units</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Packed</div>
            <div className="text-xl font-bold text-emerald-700">
              {packed.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400">fulfilled</div>
          </div>
        </div>

        {/* Pending Status */}
        {pending > 0 ? (
          <div className="mb-4 p-3 bg-rose-50 rounded-lg text-center">
            <div className="text-sm font-semibold text-rose-700">
              {pending.toLocaleString()} units pending
            </div>
            <div className="text-xs text-rose-500 mt-1">Needs attention</div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-emerald-50 rounded-lg text-center">
            <div className="text-sm font-semibold text-emerald-700">
              All items packed
            </div>
            <div className="text-xs text-emerald-600 mt-1">
              Ready for shipping
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">
              Completion
            </span>
            <span
              className={`text-sm font-bold ${
                status === "complete"
                  ? "text-emerald-600"
                  : status === "progress"
                    ? "text-amber-600"
                    : "text-rose-600"
              }`}
            >
              {percent}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  status === "complete"
                    ? "bg-gradient-to-r from-emerald-500 to-green-500"
                    : status === "progress"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-rose-500 to-pink-500"
                }`}
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
