import { Shield, Users, Crown, RefreshCw, Plus } from "lucide-react";
import { Link } from "react-router";

export function Header({ users, currentUserRole, onRefresh }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-md">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                User Management
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-0.5 sm:mt-1">Manage team access and permissions</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
              <span className="text-xs sm:text-sm text-gray-600">{users.length} Total Users</span>
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
              <span className="text-xs sm:text-sm text-gray-600">{users.filter(u => u.role === "admin").length} Admins</span>
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              <span className="text-xs sm:text-sm text-gray-600">{users.filter(u => u.role !== "admin").length} Team Members</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={onRefresh}
            className="group px-3 py-2 sm:px-5 sm:py-3 bg-white rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 sm:gap-2 border border-gray-200 hover:border-purple-300 text-sm sm:text-base"
          >
            <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 group-hover:text-purple-600 transition-all" />
            <span className="text-gray-700 group-hover:text-purple-700">Refresh</span>
          </button>
          
          {currentUserRole === "admin" && (
            <Link
              to="/logistics/signup"
              className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Add Logistics
            </Link>
          )}
          
          {["admin", "logistics"].includes(currentUserRole) && (
            <Link
              to="/packing/signup"
              className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Add Packing
            </Link>
          )}
          
          {["packing", "logistics"].includes(currentUserRole) && (
            <Link
              to="/user/password/update"
              className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Update Password
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}