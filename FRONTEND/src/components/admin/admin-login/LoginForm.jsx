// components/admin-login/LoginForm.jsx
import { Mail, Lock, LogIn, Eye, EyeOff, Shield } from "lucide-react";
import { ErrorAlert } from "./ErrorAlert";
import { SecurityNotice } from "./SecurityNotice"; 

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  error,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  onSubmit,
  onForgotPassword,
  clearError
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-3xl">
      {/* Header Strip */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-white" />
          <h2 className="text-base font-bold text-white">Authorized Access Only</h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6 md:p-8">
        <ErrorAlert error={error} onClear={clearError} />

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none transition-all duration-200"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-amber-600 hover:text-amber-700 transition-colors font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none transition-all duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 focus:ring-1"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
              Remember me on this device
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Dashboard
              </span>
            )}
          </button>
        </form>

        <SecurityNotice />
      </div>
    </div>
  );
};