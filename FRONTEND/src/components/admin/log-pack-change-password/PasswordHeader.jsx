// components/change-password/PasswordHeader.jsx
import { Shield, UserCheck } from "lucide-react";

export const PasswordHeader = ({ role }) => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="relative inline-block">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-3 sm:mb-4">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1 sm:mb-2">
        Update Password
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">Secure your account with a strong password</p>
      
      {role && (
        <div className="inline-flex items-center mt-2 sm:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 border border-blue-200">
          <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1.5 sm:mr-2" />
          <span className="text-xs sm:text-sm font-medium text-blue-700 capitalize">{role} Account</span>
        </div>
      )}
    </div>
  );
};