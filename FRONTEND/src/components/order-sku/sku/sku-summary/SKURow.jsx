// components/sku-summary/SKURow.jsx
import { Package, CheckCircle } from "lucide-react";
import { getSKUStatus } from "../utils/skuUtils";

export const SKURow = ({ sku, ordered, packed, pending }) => {
  const percent = ordered > 0 ? Math.round((packed / ordered) * 100) : 0;
  const status = getSKUStatus(percent);

  return (
    <tr className="hover:bg-indigo-50/30 transition-all duration-200 group">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Package className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <code className="font-mono font-bold text-gray-800 text-sm">
              {sku}
            </code>
            <div className="text-xs text-gray-500 mt-0.5">SKU Identifier</div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">
            {ordered.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">units</div>
        </div>
      </td>
      <td className="p-4">
        <div className="text-center">
          <div
            className={`text-lg font-bold ${percent >= 80 ? "text-emerald-600" : percent >= 50 ? "text-amber-600" : "text-gray-800"}`}
          >
            {packed.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">fulfilled</div>
        </div>
      </td>
      <td className="p-4">
        <div className="text-center">
          {pending > 0 ? (
            <div className="inline-flex flex-col items-center">
              <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-rose-100 text-rose-700 mb-1">
                {pending.toLocaleString()} pending
              </span>
              <span className="text-xs text-rose-500">Needs attention</span>
            </div>
          ) : (
            <div className="inline-flex flex-col items-center">
              <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700 mb-1">
                <CheckCircle className="h-3 w-3 inline mr-1" />
                Complete
              </span>
              <span className="text-xs text-emerald-600">All packed</span>
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-semibold ${status === "complete" ? "text-emerald-600" : status === "progress" ? "text-amber-600" : "text-rose-600"}`}
            >
              {percent}% complete
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${status === "complete" ? "bg-emerald-100 text-emerald-700" : status === "progress" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}
            >
              {status === "complete"
                ? "✓ On Track"
                : status === "progress"
                  ? "⏳ In Progress"
                  : "⚠ Attention"}
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${status === "complete" ? "bg-gradient-to-r from-emerald-500 to-green-500" : status === "progress" ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-rose-500 to-pink-500"}`}
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};
