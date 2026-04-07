import { Search } from "lucide-react";

export function SearchFilter({ searchTerm, selectedRole, onSearchChange, onRoleChange }) {
  const roles = ["all", "admin", "logistics", "packing"];
  
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0">
          <div className="flex bg-gray-100 rounded-lg sm:rounded-xl p-1 shrink-0">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedRole === role
                    ? "bg-white text-purple-700 shadow-sm border border-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {role === "all" ? "All" : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedRole !== "all" && (
        <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
          <span className="text-xs sm:text-sm text-gray-600">Showing:</span>
          <span className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
            selectedRole === "admin" ? "bg-purple-100 text-purple-700 border border-purple-200" :
            selectedRole === "logistics" ? "bg-blue-100 text-blue-700 border border-blue-200" :
            "bg-emerald-100 text-emerald-700 border border-emerald-200"
          }`}>
            {selectedRole === "admin" ? "👑 Admin Users" :
             selectedRole === "logistics" ? "🛡️ Logistics Team" :
             "📦 Packing Team"}
            <button onClick={() => onRoleChange("all")} className="ml-1 hover:bg-white/50 rounded-full p-0.5">✕</button>
          </span>
        </div>
      )}
    </div>
  );
}