import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AdminOverview from "../../components/admin/overview/AdminOverview.jsx";
import LogisticsOverview from "../../components/logistics/overview/LogisticsOverview.jsx";
import PackingOverview from "../../components/packing/overview/PackingOverview.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    if (!adminData) {
      navigate("/user/login", { replace: true });
      return;
    }

    try {
      const parsedAdmin = JSON.parse(adminData);
      setAdmin(parsedAdmin);
    } catch {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("admin");
      navigate("/user/login", { replace: true });
      return;
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-6 text-gray-600 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        {admin?.role === "admin" && <AdminOverview />}

        {admin?.role === "logistics" && <LogisticsOverview />}

        {admin?.role === "packing" && <PackingOverview />}

        {!["admin", "logistics", "packing"].includes(admin?.role) && (
          <div className="text-center text-red-500">Unauthorized role</div>
        )}
      </main>
    </div>
  );
}
