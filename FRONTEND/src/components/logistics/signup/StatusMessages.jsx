import { AlertCircle, CheckCircle, Sparkles } from "lucide-react";

export function StatusMessages({ error, success }) {
  return (
    <>
      {error && (
        <div className="mb-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-800">Action Required</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-green-800">Success!</p>
                <p className="text-green-700 text-sm mt-1">{success}</p>
              </div>
              <Sparkles className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}