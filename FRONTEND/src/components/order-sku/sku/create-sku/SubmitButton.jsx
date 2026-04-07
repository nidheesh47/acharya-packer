import { Package, PackageOpen, Loader2, ArrowLeft } from "lucide-react";

export function SubmitButton({ loading, skuType, disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
    >
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Creating {skuType === 'bundle' ? 'Bundle' : 'SKU'}...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3">
          {skuType === 'bundle' ? (
            <PackageOpen className="h-5 w-5 group-hover:scale-110 transition-transform" />
          ) : (
            <Package className="h-5 w-5 group-hover:scale-110 transition-transform" />
          )}
          <span>Create New {skuType === 'bundle' ? 'Bundle' : 'SKU'}</span>
          <ArrowLeft className="h-5 w-5 transform rotate-180 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </button>
  );
}