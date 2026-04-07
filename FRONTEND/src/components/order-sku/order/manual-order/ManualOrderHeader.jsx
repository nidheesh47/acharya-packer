import { ArrowLeft, ShoppingBag } from "lucide-react";
import { OrderPrioritySelector } from "./OrderPrioritySelector";

export function ManualOrderHeader({ onBack, order, setOrder, totals }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 transition border border-gray-200"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-md">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Create Manual Order
              </h1>
              <p className="text-gray-600 mt-1">Add new orders with detailed product information</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Package className="h-4 w-4 text-indigo-500" />
              <span className="text-sm text-gray-600">{totals.totalItems} Total Items</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">{totals.validSkus} Valid SKUs</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{totals.invalidSkus} Custom SKUs</span>
            </div>
          </div>
        </div>

        <OrderPrioritySelector order={order} setOrder={setOrder} />
      </div>
    </div>
  );
}

import { Package, CheckCircle, AlertTriangle } from "lucide-react";