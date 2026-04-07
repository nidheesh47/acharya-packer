import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_APP_URL;

export function usePackingStats() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [today, setToday] = useState(null);
  const [overall, setOverall] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activePeriod, setActivePeriod] = useState("today");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const calculatePerformance = (skuStats) => {
    if (!skuStats || skuStats.length === 0) {
      return { uniqueSkus: 0, efficiency: 0, totalScans: 0 };
    }

    const uniqueSkus = skuStats.length;
    const totalScans = skuStats.reduce((sum, item) => sum + item.count, 0);
    const efficiency = Math.min(100, Math.round((uniqueSkus * 100) / (totalScans || 1)));

    return { uniqueSkus, totalScans, efficiency };
  };

  const fetchMyStatus = async (token) => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const res = await fetch(`${API_URL}/api/packing/my-status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch your status");

      const data = await res.json();
      setToday(data.today);
      setOverall(data.overall);
      setLastUpdated(new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    if (adminData) {
      const parsed = JSON.parse(adminData);
      setAdmin(parsed);
      if (parsed.role !== "packing") {
        navigate("/unauthorized", { replace: true });
        return;
      }
    }

    fetchMyStatus(token);
  }, [navigate]);

  const handleRefresh = () => {
    const token = localStorage.getItem("auth_token");
    fetchMyStatus(token);
  };

  const handlePeriodChange = (period) => {
    setActivePeriod(period);
  };

  const getActiveStats = () => {
    if (activePeriod === "today") return today;
    if (activePeriod === "overall") return overall;
    return today;
  };

  const todayPerformance = calculatePerformance(today?.sku_stats || []);
  const overallPerformance = calculatePerformance(overall?.sku_stats || []);
  const activeStats = getActiveStats();
  const activePerformance = calculatePerformance(activeStats?.sku_stats || []);

  return {
    loading,
    admin,
    today,
    overall,
    error,
    lastUpdated,
    activePeriod,
    isRefreshing,
    mounted,
    todayPerformance,
    overallPerformance,
    activeStats,
    activePerformance,
    handleRefresh,
    handlePeriodChange,
    fetchMyStatus: () => fetchMyStatus(localStorage.getItem("auth_token"))
  };
}