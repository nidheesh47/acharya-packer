import { Package, Zap, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

export function ActionButtons({ onRefresh }) {
  const navigate = useNavigate();

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => navigate("/packing/order/scan/page")}
        className="group py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
      >
        <Package className="h-5 w-5 group-hover:scale-110 transition-transform" />
        Start Scanning Orders
        <Zap className="h-4 w-4" />
      </button>
      
      <button
        onClick={onRefresh}
        className="py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-white hover:border-blue-300 transition-all shadow-md flex items-center justify-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh Data
      </button>
    </div>
  );
}