import { AlertTriangle, CheckCircle } from "lucide-react";

export function StatusMessages({ error, success }) {
  return (
    <>
      {error && (
        <div className="mb-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">Error Creating Order</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Success</p>
                <p className="text-green-700 text-sm mt-1">{success}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}