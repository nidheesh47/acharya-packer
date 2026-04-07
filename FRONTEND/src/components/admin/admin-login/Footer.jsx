// components/admin-login/Footer.jsx
export const Footer = () => {
  return (
    <div className="mt-6 text-center">
      <p className="text-xs text-gray-500">
        Need help? <span className="text-amber-600 font-medium hover:text-amber-700 transition-colors cursor-pointer">Contact administrator</span>
      </p>
      <div className="mt-3 flex items-center justify-center space-x-4 text-[10px] text-gray-400">
        <span className="cursor-pointer hover:text-gray-600 transition-colors">Privacy Policy</span>
        <span>•</span>
        <span className="cursor-pointer hover:text-gray-600 transition-colors">Terms of Service</span>
        <span>•</span>
        <span className="cursor-pointer hover:text-gray-600 transition-colors">Security</span>
      </div>
    </div>
  );
};