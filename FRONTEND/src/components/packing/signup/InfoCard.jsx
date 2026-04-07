import { Info } from "lucide-react";

export function InfoCard() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
          <Info className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-blue-800">Packing User Information</p>
          <p className="text-xs text-blue-700 mt-1">
            Created users will receive login credentials via email and can access the packing dashboard. 
            They can scan orders, update packing status, and track their daily performance.
          </p>
        </div>
      </div>
    </div>
  );
}