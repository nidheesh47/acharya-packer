import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const APP_URL = import.meta.env.VITE_APP_URL;

export function useLogisticsSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recentUsers, setRecentUsers] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token || !adminData) {
      navigate("/user/login", { replace: true });
      return;
    }

    const parsedAdmin = JSON.parse(adminData);
    if (parsedAdmin.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Valid email is required");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`${APP_URL}/api/logistics/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create logistics user");
      }

      setSuccess(
        "Logistics user created successfully! Credentials have been emailed.",
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
      value: "99.9%",
      label: "Uptime",
      icon: "Activity",
      color: "from-emerald-500 to-green-500",
    },
    {
      value: "< 2s",
      label: "Response Time",
      icon: "Zap",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "24/7",
      label: "Support",
      icon: "Headphones",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "1M+",
      label: "Orders Processed",
      icon: "Truck",
      color: "from-orange-500 to-red-500",
    },
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
    stats,
    handleSubmit,
  };
}
