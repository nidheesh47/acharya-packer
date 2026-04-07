import { useState, useEffect, useCallback, useMemo } from "react";
import { API_BASE } from "../constants/orderConstants";
import { calculateStats, getOrderLogs } from "../utils/orderUtils";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    items_scanned: 0,
    tracking_label_pending: 0,
    scanned: 0,
    cancelled: 0,
    totalValue: 0,
    averageValue: 0,
  });
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: "all",
    minAmount: "",
    maxAmount: "",
    hasTracking: "all",
    fulfillmentStatus: "all",
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [packingLogs, setPackingLogs] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const fetchOrders = useCallback(async (token) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/order/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch orders");

      const ordersList = data.orders || [];

      const logsByOrder = {};
      ordersList.forEach((order) => {
        if (order.packing_logs && Array.isArray(order.packing_logs)) {
          logsByOrder[order._id] = order.packing_logs;
        }
      });

      setOrders(ordersList);
      setPackingLogs(logsByOrder);
      setStats(calculateStats(ordersList));
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      setCurrentUser(parsedAdmin);
    }

    if (token) {
      fetchOrders(token);
    }
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.scan_status === statusFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((o) => {
        const searchFields = [
          o.order_name,
          o.orderId,
          o.email,
          o.customer?.email,
          o.customer?.phone,
          o.tracking?.number,
          o.customer?.first_name,
          o.customer?.last_name,
          o.tracking?.company,
          o.shipping_address?.city,
          o.shipping_address?.province,
          o.shipping_address?.country,
        ];

        if (o.line_items) {
          o.line_items.forEach((item) => {
            searchFields.push(item.sku, item.title);
          });
        }

        return searchFields
          .filter(Boolean)
          .some((v) => v.toString().toLowerCase().includes(q));
      });
    }

    if (advancedFilters.dateRange !== "all") {
      const now = new Date();
      const cutoff = new Date();

      switch (advancedFilters.dateRange) {
        case "today":
          cutoff.setHours(0, 0, 0, 0);
          break;
        case "week":
          cutoff.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoff.setMonth(now.getMonth() - 1);
          break;
        case "year":
          cutoff.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter((o) => {
        const orderDate = new Date(
          o.createdAt?.$date ||
            o.createdAt ||
            o.updatedAt?.$date ||
            o.updatedAt,
        );
        return orderDate >= cutoff;
      });
    }

    if (advancedFilters.minAmount) {
      const min = parseFloat(advancedFilters.minAmount);
      filtered = filtered.filter((o) => parseFloat(o.total_price || 0) >= min);
    }

    if (advancedFilters.maxAmount) {
      const max = parseFloat(advancedFilters.maxAmount);
      filtered = filtered.filter((o) => parseFloat(o.total_price || 0) <= max);
    }

    if (advancedFilters.hasTracking !== "all") {
      if (advancedFilters.hasTracking === "yes") {
        filtered = filtered.filter((o) => o.tracking?.number);
      } else {
        filtered = filtered.filter((o) => !o.tracking?.number);
      }
    }

    if (advancedFilters.fulfillmentStatus !== "all") {
      filtered = filtered.filter(
        (o) => o.fulfillment_status === advancedFilters.fulfillmentStatus,
      );
    }

    filtered.sort((a, b) => {
      let aVal, bVal;

      switch (sortBy) {
        case "createdAt":
          aVal = new Date(a.createdAt?.$date || a.createdAt);
          bVal = new Date(b.createdAt?.$date || b.createdAt);
          break;
        case "total_price":
          aVal = parseFloat(a.total_price || 0);
          bVal = parseFloat(b.total_price || 0);
          break;
        case "order_name":
          aVal = a.order_name;
          bVal = b.order_name;
          break;
        case "customer":
          aVal = `${a.customer?.first_name || ""} ${a.customer?.last_name || ""}`;
          bVal = `${b.customer?.first_name || ""} ${b.customer?.last_name || ""}`;
          break;
        default:
          aVal = new Date(a.createdAt?.$date || a.createdAt);
          bVal = new Date(b.createdAt?.$date || b.createdAt);
      }

      if (sortOrder === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });

    return filtered;
  }, [search, orders, statusFilter, advancedFilters, sortBy, sortOrder]);

  const toggleOrderSelection = (orderId) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders(new Set());
    } else {
      const allOrderIds = filteredOrders.map((order) => order._id);
      setSelectedOrders(new Set(allOrderIds));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const allOrderIds = filteredOrders.map((order) => order._id);
    const allSelected =
      allOrderIds.length > 0 &&
      allOrderIds.every((id) => selectedOrders.has(id));
    setSelectAll(allSelected);
  }, [selectedOrders, filteredOrders]);

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      dateRange: "all",
      minAmount: "",
      maxAmount: "",
      hasTracking: "all",
      fulfillmentStatus: "all",
    });
  };

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  return {
    // State
    orders,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    statusFilter,
    setStatusFilter,
    selectedOrders,
    setSelectedOrders,
    selectAll,
    stats,
    advancedFilters,
    setAdvancedFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    packingLogs,
    currentUser,
    filteredOrders,
    paginatedOrders,
    totalPages,

    // Actions
    fetchOrders,
    toggleOrderSelection,
    toggleSelectAll,
    resetAdvancedFilters,
    calculateStats,
    getOrderLogs: (orderId) => getOrderLogs(packingLogs, orderId),
  };
};
