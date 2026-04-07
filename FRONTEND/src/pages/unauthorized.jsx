import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/admin/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="text-7xl mb-4">
          🚫
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-4">
          You don't have permission to access this page.
        </p>

        {/* Message Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-700 font-medium">
            This area is restricted to authorized personnel only.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Please contact your administrator if you believe this is a mistake.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200"
          >
            Dashboard
          </button>
        </div>

        {/* Redirect Info */}
        <p className="mt-4 text-sm text-gray-500">
          Redirecting to dashboard in <span className="font-semibold text-blue-600">{countdown}</span> seconds...
        </p>

        {/* Footer */}
        <p className="mt-6 text-xs text-gray-400">
          Error 403 — Unauthorized Access
        </p>
      </div>
    </div>
  );
}