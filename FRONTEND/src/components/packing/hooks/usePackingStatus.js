import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_APP_URL;

export function usePackingStatus() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [today, setToday] = useState(null);
  const [overall, setOverall] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [shopDomain, setShopDomain] = useState("");
  const [mounted, setMounted] = useState(false);

  const calculatePerformance = (skuStats) => {
    if (!skuStats || !Array.isArray(skuStats) || skuStats.length === 0) {
      return { uniqueSkus: 0, totalScans: 0, efficiency: 0 };
    }

    const uniqueSkus = skuStats.length;
    const totalScans = skuStats.reduce((sum, item) => sum + (item.count || 0), 0);
    const efficiency = Math.min(100, Math.round((uniqueSkus / (totalScans || 1)) * 100));

    return { uniqueSkus, totalScans, efficiency };
  };

  const calculateTrend = (todayValue, overallValue) => {
    if (todayValue === undefined || todayValue === null) return 0;
    if (!overallValue || overallValue === 0) return 100;
    
    const average = overallValue / 30;
    if (average === 0) return 100;
    
    const difference = todayValue - average;
    const percentage = (difference / average) * 100;
    
    return Math.round(percentage * 10) / 10;
  };

  const fetchMyStatus = async (token) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${API_URL}/api/packing/my-status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 403) {
          navigate("/unauthorized", { replace: true });
          return;
        }
        throw new Error(errorData.error || `Failed to fetch status`);
      }

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || "API request failed");
      }
      
      setToday(data.today || {
        date: new Date().toISOString().split('T')[0],
        total_scans: 0,
        total_orders: 0,
        sku_stats: []
      });
      
      setOverall(data.overall || {
        total_scans: 0,
        total_orders: 0,
        sku_stats: []
      });
      
      if (data.agent?.shop_domain) {
        setShopDomain(data.agent.shop_domain);
      }
      
      setLastUpdated(new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    } catch (err) {
      console.error("Error fetching status:", err);
      setError(err.message);
      
      if (err.message.includes("401") || err.message.includes("403")) {
        setTimeout(() => {
          navigate("/user/login");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    const token = localStorage.getItem("auth_token");
    fetchMyStatus(token);
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
      try {
        const parsed = JSON.parse(adminData);
        setAdmin(parsed);
        if (parsed.role !== "packing") {
          navigate("/unauthorized", { replace: true });
          return;
        }
        if (parsed.shop_domain) {
          setShopDomain(parsed.shop_domain);
        }
      } catch (err) {
        console.error("Error parsing admin data:", err);
        setError("Invalid user data. Please log in again.");
        setTimeout(() => navigate("/user/login"), 2000);
        return;
      }
    }

    fetchMyStatus(token);
  }, [navigate]);

  const todayPerformance = calculatePerformance(today?.sku_stats || []);
  const overallPerformance = calculatePerformance(overall?.sku_stats || []);
  
  const todayDate = today?.date || new Date().toISOString().split('T')[0];
  const formattedDate = new Date(todayDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    loading,
    admin,
    today,
    overall,
    error,
    lastUpdated,
    shopDomain,
    mounted,
    todayPerformance,
    overallPerformance,
    formattedDate,
    handleRefresh,
    calculateTrend,
    fetchMyStatus
  };
}