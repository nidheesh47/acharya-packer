import { Users } from "lucide-react";
import { RecentUserItem } from "./RecentUserItem";

export function RecentUsersCard({ recentUsers }) {
  if (recentUsers.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Recently Created</h3>
              <p className="text-xs text-gray-500">Latest team members</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            {recentUsers.length}
          </span>
        </div>

        <div className="space-y-3">
          {recentUsers.map((user, index) => (
            <RecentUserItem key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}