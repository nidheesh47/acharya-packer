// components/change-password/PasswordInput.jsx
import { Lock, Eye, EyeOff, Fingerprint, Key, CheckCircle } from "lucide-react";

export const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  showPassword,
  onToggleShow,
  required = true,
  type = "password",
  error,
  success,
}) => {
  const inputIcon = {
    current: Fingerprint,
    new: Key,
    confirm: CheckCircle,
  }[type] || Lock;

  const InputIcon = Icon || inputIcon;

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1.5 sm:gap-2">
        <InputIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <InputIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-200"
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          ) : (
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
          )}
        </button>
      </div>
      {error && (
        <div className="text-xs text-red-600 flex items-center gap-1 mt-1">
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
          <CheckCircle className="w-3 h-3" />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
};