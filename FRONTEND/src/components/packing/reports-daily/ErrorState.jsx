import { AlertCircle } from "lucide-react";

export function ErrorState({ error }) {
  return (
    <div className="mb-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-800">Error Loading Report</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}