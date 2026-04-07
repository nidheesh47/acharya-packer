import { Scan, Zap, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

export function ActionButtons({ isRefreshing, onRefresh }) {
  const navigate = useNavigate();

  return (
    <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
      <button
        onClick={() => navigate("/packing/order/scan/page")}
        className="group py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base w-full"
      >
        <Scan className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
        Continue Scanning
        <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:animate-pulse" />
      </button>

      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 rounded-lg sm:rounded-xl hover:bg-white hover:border-blue-300 transition-all shadow-md flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-50 text-sm sm:text-base w-full"
      >
        <RefreshCw
          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isRefreshing ? "animate-spin" : ""}`}
        />
        {isRefreshing ? "Refreshing..." : "Refresh Dashboard"}
      </button>
    </div>
  );
}
