import { Users } from "lucide-react";
import { UserCard } from "./UserCard";

export function UsersGrid({ users, actionLoading, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-200 p-6 sm:p-12 text-center">
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
          <Users className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">No Users Found</h3>
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
          No users match your search criteria
        </p>
      </div>
    );
  }

  const adminData = JSON.parse(localStorage.getItem("admin") || "{}");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {users.map((user) => (
        <UserCard
          key={user.admin_id}
          user={user}
          isCurrentUser={user.email === adminData.email}
          actionLoading={actionLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}