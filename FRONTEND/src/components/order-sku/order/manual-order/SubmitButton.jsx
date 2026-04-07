import { Save, Loader2 } from "lucide-react";

export function SubmitButton({ submitting }) {
  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-600 font-medium">Ready to create this order?</p>
          <p className="text-sm text-gray-500">Review all information before submitting</p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-3 font-medium"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating Order...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Create Order
            </>
          )}
        </button>
      </div>
    </div>
  );
}