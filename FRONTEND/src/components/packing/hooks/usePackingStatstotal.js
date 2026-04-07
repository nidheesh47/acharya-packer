import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_APP_URL;

export function usePackingStats() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
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
        
        if (!["admin", "logistics"].includes(parsedAdmin.role)) {
          navigate("/unauthorized", { replace: true });
          return;
        }
        
        if (parsedAdmin.shop_domain) {
          setShopDomain(parsedAdmin.shop_domain);
        }
      } catch (err) {
        console.error("Error parsing admin data:", err);
        setError("Invalid user data. Please log in again.");
        return;
      }
    }

    fetchStats(token);
  }, [navigate]);

  const fetchStats = async (token) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${API_URL}/api/packing/stats`, {
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
        
        throw new Error(errorData.error || `Failed to fetch stats: ${res.status}`);
      }

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || "API request failed");
      }
      
      if (data.shop_domain) {
        setShopDomain(data.shop_domain);
      }
      
      setStats(data.stats || []);
      
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
        ["Agent ID", "Agent Name", "Role", "Total Scans", "SKU", "SKU Scan Count"],
        ...stats.flatMap(agent => {
          const agentId = agent._id || "N/A";
          const agentName = agent.name || "Unknown";
          const agentRole = agent.role || "N/A";
          const totalScans = agent.total_scans || 0;
          
          if (!agent.sku_stats || !Array.isArray(agent.sku_stats)) {
            return [[agentId, agentName, agentRole, totalScans, "N/A", 0]];
          }
          
          return agent.sku_stats.map(skuItem => [
            agentId,
            agentName,
            agentRole,
            totalScans,
            skuItem.sku || "Unknown",
            skuItem.count || 0
          ]);
        })
      ].map(row => row.map(cell => 
        typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell
      ).join(",")).join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const today = new Date().toISOString().split('T')[0];
      a.download = `packing-stats-${shopDomain || 'shop'}-${today}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      setError("Failed to export CSV: " + err.message);
    }
  };

  const handleRefresh = () => {
    const token = localStorage.getItem("auth_token");
    fetchStats(token);
  };

  const filteredStats = stats.filter(agent => {
    if (filterRole !== "all" && agent.role !== filterRole) return false;
    
    const search = searchTerm.toLowerCase();
    const agentName = (agent.name || "").toLowerCase();
    const agentId = (agent._id || "").toLowerCase();
    
    return agentName.includes(search) || agentId.includes(search);
  });

  const uniqueRoles = [...new Set(stats.map(agent => agent.role).filter(Boolean))];
  const totalScans = stats.reduce((sum, agent) => sum + (agent.total_scans || 0), 0);
  const totalAgents = stats.length;
  const avgScansPerAgent = totalAgents > 0 ? Math.round(totalScans / totalAgents) : 0;

  return {
    loading,
    admin,
    stats,
    error,
    searchTerm, setSearchTerm,
    filterRole, setFilterRole,
    expandedAgent, setExpandedAgent,
    shopDomain,
    mounted,
    filteredStats,
    uniqueRoles,
    totalScans,
    totalAgents,
    avgScansPerAgent,
    handleExportCSV,
    handleRefresh,
    fetchStats
  };
}