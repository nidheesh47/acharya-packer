import { AlertCircle } from "lucide-react";

export function ErrorDetailsList({ errors }) {
  if (!errors?.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <div>
            <h4 className="font-semibold text-gray-800">Error Details</h4>
            <p className="text-sm text-gray-500">
              {errors.length} row{errors.length !== 1 ? 's' : ''} had errors
            </p>
          </div>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
        {errors.map((e, i) => (
          <div key={i} className="px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-red-50 rounded-lg flex-shrink-0">
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">
                  {e.order_name || `Row ${i + 1}`}
                </p>
                <p className="text-red-600 text-sm mt-1 break-words">
                  {e.error}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}