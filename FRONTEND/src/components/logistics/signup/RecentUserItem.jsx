import { CheckCircle, Calendar } from "lucide-react";

export function RecentUserItem({ user }) {
  return (
    <div className="group p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <CheckCircle className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate group-hover:text-blue-700">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 truncate group-hover:text-blue-600">
            {user.email}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-[10px] text-gray-400">
              {user.created}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}