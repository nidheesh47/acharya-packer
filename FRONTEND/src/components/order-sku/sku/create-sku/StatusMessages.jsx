import { AlertCircle, CheckCircle, Sparkles, Rocket } from "lucide-react";

export function StatusMessages({ error, success, autoCreateResult }) {
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
                
                {autoCreateResult && autoCreateResult.length > 0 && (
                  <div className="mt-4 p-4 bg-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        Auto-created {autoCreateResult.length} component SKU(s):
                      </span>
                    </div>
                    <div className="space-y-2">
                      {autoCreateResult.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="font-mono text-green-700">{item.sku}</span>
                          <span className="text-green-600">-</span>
                          <span className="text-green-700">{item.product_name || 'Auto-named'}</span>
                          {item.action === 'reactivated' && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                              Reactivated
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Sparkles className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}