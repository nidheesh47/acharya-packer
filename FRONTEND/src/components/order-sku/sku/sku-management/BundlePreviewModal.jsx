import { X, PackageOpen } from "lucide-react";

export function BundlePreviewModal({ bundlePreview, setBundlePreview }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <PackageOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Bundle Contents</h3>
                <p className="text-sm text-gray-500">SKU: {bundlePreview.sku}</p>
              </div>
            </div>
            <button onClick={() => setBundlePreview(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-gray-800 mb-2">{bundlePreview.product_name || 'Bundle Product'}</p>
            <p className="text-xs text-gray-500 mb-3">Contains {bundlePreview.bundle_items?.length || 0} component SKUs:</p>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {bundlePreview.bundle_items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-purple-100">
                  <div>
                    <p className="font-medium text-gray-800">{item.sku}</p>
                    <p className="text-xs text-gray-500">Component SKU</p>
                  </div>
                  <div className="bg-purple-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-purple-700">x{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setBundlePreview(null)}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}