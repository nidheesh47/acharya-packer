import { User, Mail, Send, Rocket, Loader2, UserPlus } from "lucide-react";
import { InfoCard } from "./InfoCard";

export function LogisticsForm({ 
  name, setName, 
  email, setEmail, 
  loading, 
  onSubmit 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">New Logistics User</h2>
              <p className="text-sm text-gray-500">Fill in the details below to create an account</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={loading}
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
            </div>

            <InfoCard />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <span>Create Logistics Account</span>
                  <Rocket className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}