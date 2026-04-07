import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const APP_URL = import.meta.env.VITE_APP_URL;

export function useAdminStats() {
  const navigate = useNavigate();
  const [today, setToday] = useState(null);
  const [yesterday, setYesterday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const calculateChange = (todayVal, yesterdayVal) => {
    if (!yesterdayVal || yesterdayVal === 0) return { value: 100, direction: 'up', positive: true };
    const change = ((todayVal - yesterdayVal) / yesterdayVal) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      direction: change >= 0 ? 'up' : 'down',
      positive: change >= 0
    };
  };

  const getScanRate = () => {
    if (!today || !yesterday) return null;
    const todayRate = today.orders.scanned / (today.orders.total || 1) * 100;
    const yesterdayRate = yesterday.orders.scanned / (yesterday.orders.total || 1) * 100;
    const change = calculateChange(todayRate, yesterdayRate);
    return {
      today: todayRate.toFixed(1),
      yesterday: yesterdayRate.toFixed(1),
      change
    };
  };

  const getEfficiencyScore = () => {
    if (!today) return 0;
    if (today.orders.total === 0) return 100;
    
    const scanRate = (today.orders.scanned / today.orders.total) * 100;
    const pendingRate = (today.orders.pending / today.orders.total) * 100;
    const skuEfficiency = today.sku.total_ordered_quantity > 0 
      ? (today.sku.total_scanned_quantity / today.sku.total_ordered_quantity) * 100 
      : 100;
    
    return (scanRate * 0.5 + (100 - pendingRate) * 0.3 + skuEfficiency * 0.2).toFixed(0);
  };

  async function fetchStats(token) {
    try {
      setLoading(true);
      setError("");

      const [todayRes, yesterdayRes] = await Promise.all([
        fetch(`${APP_URL}/api/order/stats/today`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${APP_URL}/api/order/stats/yesterday`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const todayData = await todayRes.json();
      const yesterdayData = await yesterdayRes.json();

      if (!todayRes.ok) throw new Error(todayData.error || "Failed to load today stats");
      if (!yesterdayRes.ok) throw new Error(yesterdayData.error || "Failed to load yesterday stats");

      setToday(todayData);
      setYesterday(yesterdayData);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const admin = localStorage.getItem("admin");

    if (!token || !admin) {
      navigate("/user/login", { replace: true });
      return;
    }

    fetchStats(token);
  }, [navigate]);

  return {
    today,
    yesterday,
    loading,
    error,
    lastRefresh,
    fetchStats: () => fetchStats(localStorage.getItem("auth_token")),
    calculateChange,
    getScanRate,
    getEfficiencyScore
  };
}