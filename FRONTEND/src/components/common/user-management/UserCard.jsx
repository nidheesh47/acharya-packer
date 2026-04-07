import { Mail, Globe, Edit, Trash2, Loader2, Star, Crown, Shield, Package, User } from "lucide-react";

export function UserCard({ user, isCurrentUser, actionLoading, onEdit, onDelete }) {
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return {
          bg: "from-purple-500 to-pink-500",
          text: "text-purple-700",
          bgLight: "from-purple-50 to-pink-50",
          border: "border-purple-200",
          icon: Crown,
        };
      case "logistics":
        return {
          bg: "from-blue-500 to-cyan-500",
          text: "text-blue-700",
          bgLight: "from-blue-50 to-cyan-50",
          border: "border-blue-200",
          icon: Shield,
        };
      case "packing":
        return {
          bg: "from-emerald-500 to-green-500",
          text: "text-emerald-700",
          bgLight: "from-emerald-50 to-green-50",
          border: "border-emerald-200",
          icon: Package,
        };
      default:
        return {
          bg: "from-gray-500 to-slate-500",
          text: "text-gray-700",
          bgLight: "from-gray-50 to-slate-50",
          border: "border-gray-200",
          icon: User,
        };
    }
  };

  const roleColors = getRoleColor(user.role);
  const RoleIcon = roleColors.icon;

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${roleColors.bg}`}></div>
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <div className={`relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-gradient-to-br ${roleColors.bgLight} border ${roleColors.border} rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm`}>
                <RoleIcon className={`h-6 w-6 sm:h-8 sm:w-8 ${roleColors.text}`} />
                {isCurrentUser && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm sm:text-lg truncate">{user.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
                  <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            </div>
            <span className={`px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-full bg-gradient-to-r ${roleColors.bgLight} ${roleColors.text} border ${roleColors.border} whitespace-nowrap ml-2`}>
              {user.role.toUpperCase()}
            </span>
          </div>
          
          {user.shop_domain && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="font-medium truncate">{user.shop_domain}</span>
              </div>
            </div>
          )}
          
          <div className="flex gap-2 sm:gap-3">
            {user.role === "admin" && (
              <button
                onClick={() => onEdit(user)}
                className="flex-1 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Edit Profile
              </button>
            )}

            {["logistics", "packing"].includes(user.role) && (
              <button
                onClick={() => onDelete(user)}
                disabled={actionLoading === user.admin_id}
                className="flex-1 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                {actionLoading === user.admin_id ? (
                  <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}