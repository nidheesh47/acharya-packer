import { Users } from "lucide-react";

export function LoadingState({ mounted }) {
  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative w-full max-w-sm">
        <div className="relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <div className="relative mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-spin" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            Loading User Management
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">Fetching user data and permissions...</p>
        </div>
      </div>
    </div>
  );
}