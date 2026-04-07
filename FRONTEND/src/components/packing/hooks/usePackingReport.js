import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_APP_URL;

export function usePackingReport() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [shopDomain, setShopDomain] = useState("");
  const [mounted, setMounted] = useState(false);

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
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
        if (parsedAdmin.shop_domain) {
          setShopDomain(parsedAdmin.shop_domain);
        }
      } catch (e) {
        console.error("Error parsing admin data:", e);
      }
    }

    fetchTodayStats(token);
  }, [navigate]);

  const fetchTodayStats = async (token) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/api/order/scan-daily`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch stats: ${res.status}`,
        );
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "API request failed");
      }

      if (data.shop_domain) {
        setShopDomain(data.shop_domain);
      }

      const statsData = data.stats || [];
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching stats:", err);
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

  const handleExportCSV = () => {
    try {
      if (stats.length === 0) {
        setError("No data to export");
        return;
      }

      const csvContent = [
        [
          "Agent Name",
          "Agent ID",
          "Date",
          "Total Scans",
          "Total Orders",
          "SKU",
          "Scan Count",
        ],
        ...stats.flatMap((agent) => {
          if (!agent.sku_stats || !Array.isArray(agent.sku_stats)) {
            return [
              [
                agent.agent_name || "Unknown",
                agent.agent_id || "N/A",
                agent.date || new Date().toISOString().split("T")[0],
                agent.total_scans || 0,
                agent.total_orders || 0,
                "N/A",
                0,
              ],
            ];
          }

          return agent.sku_stats.map((skuItem) => [
            agent.agent_name || "Unknown",
            agent.agent_id || "N/A",
            agent.date || new Date().toISOString().split("T")[0],
            agent.total_scans || 0,
            agent.total_orders || 0,
            skuItem.sku || "Unknown",
            skuItem.count || 0,
          ]);
        }),
      ]
        .map((row) =>
          row
            .map((cell) =>
              typeof cell === "string" ? `"${cell.replace(/"/g, '""')}"` : cell,
            )
            .join(","),
        )
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const today = new Date().toISOString().split("T")[0];
      a.download = `packing-report-${shopDomain || "shop"}-${today}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      setError("Failed to export CSV: " + err.message);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getTopSkus = () => {
    try {
      const skuMap = new Map();
      stats.forEach((agent) => {
        if (agent.sku_stats && Array.isArray(agent.sku_stats)) {
          agent.sku_stats.forEach((sku) => {
            if (sku && sku.sku) {
              skuMap.set(
                sku.sku,
                (skuMap.get(sku.sku) || 0) + (sku.count || 0),
              );
            }
          });
        }
      });
      return Array.from(skuMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    } catch (err) {
      console.error("Error calculating top SKUs:", err);
      return [];
    }
  };

  const filteredStats = stats.filter((agent) => {
    if (!agent) return false;

    const agentName = (agent.agent_name || "").toLowerCase();
    const agentId = (agent.agent_id || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    return agentName.includes(search) || agentId.includes(search);
  });

  const totalScansToday = stats.reduce(
    (sum, agent) => sum + (agent.total_scans || 0),
    0,
  );
  const totalOrdersToday = stats.reduce(
    (sum, agent) => sum + (agent.total_orders || 0),
    0,
  );
  const uniqueAgents = stats.length;
  const topSkus = getTopSkus();

  return {
    loading,
    admin,
    stats,
    error,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    expandedAgent,
    setExpandedAgent,
    shopDomain,
    mounted,
    filteredStats,
    totalScansToday,
    totalOrdersToday,
    uniqueAgents,
    topSkus,
    fetchTodayStats: () => fetchTodayStats(localStorage.getItem("auth_token")),
    handleExportCSV,
    handlePrint,
  };
}
