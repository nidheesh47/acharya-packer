// hooks/useSKUSummary.js
import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { skuService } from "../services/skuService";
import { calculateStats } from "../utils/skuUtils";

export const useSKUSummary = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "pending",
    direction: "desc",
  });
  const [viewMode, setViewMode] = useState("table");
  const [isMobile, setIsMobile] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [shopDomain, setShopDomain] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [stats, setStats] = useState({
    totalSkus: 0,
    totalOrdered: 0,
    totalPacked: 0,
    totalPending: 0,
    completion: 0,
    trend: "stable",
  });
  const [ordered, setOrdered] = useState({});
  const [packed, setPacked] = useState({});
  const [pending, setPending] = useState({});

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setViewMode("grid");
      else setViewMode("table");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    if (adminData) {
      const parsed = JSON.parse(adminData);
      setAdmin(parsed);

      if (!["admin", "logistics"].includes(parsed.role)) {
        navigate("/unauthorized", { replace: true });
        return;
      }

      setShopDomain(parsed.shop_domain || "");
    }

    fetchData(token);
  }, [navigate]);

  const fetchData = useCallback(async (token) => {
    try {
      setLoading(true);
      setError(null);

      const data = await skuService.fetchSummary(token);

      setOrdered(data.summary.ordered || {});
      setPacked(data.summary.packed || {});
      setPending(data.summary.pending || {});
      setShopDomain(data.shop_domain || "");
      setLastUpdated(new Date());

      setStats(calculateStats(data.summary));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    const token = localStorage.getItem("auth_token");
    if (token) fetchData(token);
  }, [fetchData]);

  const handleSort = useCallback((key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const getSortedSkus = useMemo(() => {
    return Object.keys(ordered).sort((a, b) => {
      let aVal = 0;
      let bVal = 0;

      switch (sortConfig.key) {
        case "sku":
          aVal = a;
          bVal = b;
          break;
        case "ordered":
          aVal = ordered[a] || 0;
          bVal = ordered[b] || 0;
          break;
        case "packed":
          aVal = packed[a] || 0;
          bVal = packed[b] || 0;
          break;
        case "pending":
          aVal = pending[a] || 0;
          bVal = pending[b] || 0;
          break;
        case "completion":
          aVal = ordered[a] > 0 ? (packed[a] / ordered[a]) * 100 : 0;
          bVal = ordered[b] > 0 ? (packed[b] / ordered[b]) * 100 : 0;
          break;
        default:
          break;
      }

      return sortConfig.direction === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
          ? 1
          : -1;
    });
  }, [ordered, packed, pending, sortConfig]);

  const filteredSkus = useMemo(() => {
    return getSortedSkus.filter((sku) => {
      if (!search) return true;
      return sku.toLowerCase().includes(search.toLowerCase());
    });
  }, [getSortedSkus, search]);

  const getSKUData = useCallback(
    (sku) => ({
      ordered: ordered[sku] || 0,
      packed: packed[sku] || 0,
      pending: pending[sku] || 0,
    }),
    [ordered, packed, pending],
  );

  return {
    // State
    loading,
    error,
    search,
    setSearch,
    sortConfig,
    viewMode,
    setViewMode,
    isMobile,
    admin,
    shopDomain,
    lastUpdated,
    stats,
    ordered,
    packed,
    pending,
    filteredSkus,
    getSKUData,

    // Actions
    refreshData,
    handleSort,
  };
};
