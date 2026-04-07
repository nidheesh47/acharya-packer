// components/admin-login/MobileHeader.jsx
import { Sparkles } from "lucide-react";

export const MobileHeader = () => {
  return (
    <div className="lg:hidden text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg mb-4">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-sm text-gray-600">Secure access for authorized personnel</p>
    </div>
  );
};