import React from "react";
import { ShoppingBag, Clock } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse shadow-xl">
          <ShoppingBag className="h-12 w-12 text-white" />
        </div>
        <div className="absolute -inset-6 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Loading Orders
        </h3>
        <p className="text-slate-600 mb-6">Fetching your order data...</p>
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
          <Clock className="h-4 w-4 animate-pulse" />
          <span>Processing orders and packing logs</span>
        </div>
      </div>
    </div>
  );
}