import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const APP_URL = import.meta.env.VITE_APP_URL;

export function usePackingSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recentUsers, setRecentUsers] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token || !adminData) {
      navigate("/user/login", { replace: true });
      return;
    }

    const parsed = JSON.parse(adminData);
    setUserRole(parsed.role);

    if (!["admin", "logistics"].includes(parsed.role)) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`${APP_URL}/api/packing/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create packing user");
      }

      setSuccess(
        "Packing user created successfully! Credentials have been emailed.",
      );

      setRecentUsers((prev) => [
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          created: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev.slice(0, 2),
      ]);

      setName("");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      value: "500+",
      label: "Active Packers",
      icon: "Users",
      color: "from-emerald-500 to-green-500",
    },
    {
      value: "10k+",
      label: "Orders/Day",
      icon: "Package",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "99.5%",
      label: "Accuracy Rate",
      icon: "Target",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "24/7",
      label: "Support",
      icon: "Headphones",
      color: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    { icon: "Zap", text: "Real-time order tracking", color: "text-yellow-500" },
    { icon: "BarChart", text: "Performance analytics", color: "text-blue-500" },
    { icon: "Shield", text: "Role-based access", color: "text-green-500" },
    { icon: "Rocket", text: "Fast onboarding", color: "text-purple-500" },
  ];

  return {
    name,
    setName,
    email,
    setEmail,
    loading,
    error,
    success,
    recentUsers,
    mounted,
    userRole,
    stats,
    features,
    handleSubmit,
  };
}
