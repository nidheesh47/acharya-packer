// pages/ChangePassword.jsx
import { useChangePassword } from "../hooks/useChangePassword";
import { PasswordHeader } from "./PasswordHeader";
import { PasswordForm } from "./PasswordForm";
import { ErrorAlert } from "./ErrorAlert";
import { SuccessAlert } from "./SuccessAlert";
import { SecurityNotice } from "./SecurityNotice";
import { Key } from "lucide-react";

export default function ChangePassword() {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    role,
    mounted,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    error,
    success,
    passwordRequirements,
    passwordStrength,
    getStrengthColor,
    getStrengthText,
    getStrengthBgColor,
    handleSubmit,
    clearError,
    clearSuccess,
  } = useChangePassword();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative px-3 sm:px-4 py-4 sm:py-6 max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="w-full">
          <PasswordHeader role={role} />

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg sm:rounded-xl">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">Change Password</h2>
                  <p className="text-blue-100 text-xs sm:text-sm mt-0.5">Enter current and new password</p>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-6 md:p-8">
              <ErrorAlert error={error} onClear={clearError} />
              <SuccessAlert success={success} onClear={clearSuccess} />

              <PasswordForm
                oldPassword={oldPassword}
                setOldPassword={setOldPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                showOldPassword={showOldPassword}
                setShowOldPassword={setShowOldPassword}
                showNewPassword={showNewPassword}
                setShowNewPassword={setShowNewPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                loading={loading}
                passwordStrength={passwordStrength}
                passwordRequirements={passwordRequirements}
                getStrengthColor={getStrengthColor}
                getStrengthText={getStrengthText}
                getStrengthBgColor={getStrengthBgColor}
                onSubmit={handleSubmit}
              />

              <SecurityNotice />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs text-gray-500">
              For security assistance, contact your system administrator
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          input, button, select, textarea {
            font-size: 16px !important;
          }
          
          input:focus {
            font-size: 16px !important;
          }
        }
        
        @media (max-width: 640px) {
          button, 
          [role="button"],
          input[type="submit"] {
            min-height: 44px;
          }
          
          input, select, textarea {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
}