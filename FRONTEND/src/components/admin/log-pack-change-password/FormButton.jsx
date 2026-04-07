// components/common/FormButton.jsx
import { LogOut } from "lucide-react";

export const FormButton = ({ loading, onClick, type = "submit", children }) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center group text-sm sm:text-base"
    >
      {loading ? (
        <span className="flex items-center gap-2 sm:gap-3">
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Updating Security...
        </span>
      ) : (
        <span className="flex items-center gap-2 sm:gap-3">
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
          {children || "Update Password & Sign Out"}
        </span>
      )}
    </button>
  );
};