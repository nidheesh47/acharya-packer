// components/sku-summary/LoadingState.jsx
import { Package } from "lucide-react";

export const LoadingState = ({ mounted }) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative bg-white rounded-2xl shadow-lg p-8 text-center w-80">
        <div className="relative mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Package className="h-10 w-10 text-white animate-spin" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Loading Inventory
        </h3>
        <p className="text-sm text-gray-500">Analyzing SKU data...</p>
      </div>
    </div>
  );
};