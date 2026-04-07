import { X, Mail, Globe, Key, Lock, Eye, EyeOff, LogOut, CheckCircle, Loader2, Edit } from "lucide-react";

export function EditProfileModal({
  isOpen,
  editData,
  showPassword,
  actionLoading,
  onClose,
  onChange,
  onTogglePassword,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl sm:rounded-t-2xl"></div>
        
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl">
                <Edit className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Edit Admin Profile</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={onChange}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Shop Domain
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  name="shop_domain"
                  value={editData.shop_domain}
                  onChange={onChange}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Webhook Secret
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  name="webhook_secret"
                  value={editData.webhook_secret}
                  onChange={onChange}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-gray-200">
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                <Key className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Change Password (Optional)
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type={showPassword.old_password ? "text" : "password"}
                      name="old_password"
                      value={editData.old_password}
                      onChange={onChange}
                      className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => onTogglePassword("old_password")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword.old_password ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type={showPassword.new_password ? "text" : "password"}
                      name="new_password"
                      value={editData.new_password}
                      onChange={onChange}
                      className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter new password (leave blank to keep current)"
                    />
                    <button
                      type="button"
                      onClick={() => onTogglePassword("new_password")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword.new_password ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-amber-50 rounded-lg sm:rounded-xl border border-amber-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-amber-800 mb-1">⚠️ Important: Security Update Will Log You Out</p>
                  <p className="text-xs text-amber-700">
                    Updating your <span className="font-semibold">Email Address, Shop Domain, Webhook Secret, or Password</span> will automatically log you out from all devices for security reasons.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading === "edit"}
                className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              >
                {actionLoading === "edit" ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}