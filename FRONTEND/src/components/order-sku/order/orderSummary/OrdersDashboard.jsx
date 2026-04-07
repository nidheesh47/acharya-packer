import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Package,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  User,
  Mail,
  Phone,
  Calendar,
  Download,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Check,
  Zap,
  ListChecks,
  Box,
  MoreVertical,
  FileText,
  MapPin,
  ShoppingBag,
  Layers,
  Hash,
  DollarSign,
  ShoppingCart,
  CheckSquare,
  Square,
  Home,
  Building,
  Navigation,
  UserCheck,
  History,
  Activity,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Tag,
  Percent,
  CreditCard,
  Users,
  Star,
  Bell,
  Settings,
  Grid,
  LayoutGrid,
  Table,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  Info,
  HelpCircle,
  FileBarChart,
  PieChart,
  TrendingDown,
  Award,
  Target,
  Flag,
  Globe,
  Map,
  Smartphone,
  RefreshCw,
  Maximize2,
  Minimize2,
  Scan,
  FileClock,
  ClipboardList,
  ScanLine,
  ActivitySquare,
  FileSearch,
  ScanEye,
  Link,
  Link2,
  Copy,
  AlertOctagon,
  Save,
  Plus,
  Minus,
  FilterIcon,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_APP_URL;

const formatDate = (d) => {
  if (!d) return "-";
  if (typeof d === "string")
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  if (d.$date)
    return new Date(d.$date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatShortDate = (d) => {
  if (!d) return "-";
  const date =
    typeof d === "string"
      ? new Date(d)
      : d.$date
        ? new Date(d.$date)
        : new Date(d);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatFullDateTime = (d) => {
  if (!d) return "-";
  const date =
    typeof d === "string"
      ? new Date(d)
      : d?.$date
        ? new Date(d.$date)
        : new Date(d);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatTimeAgo = (date) => {
  if (!date) return "";
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatShortDate(date);
};

export default function EnhancedOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [bulkOperation, setBulkOperation] = useState(null);
  const [showBulkOps, setShowBulkOps] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? "grid" : "table";
    }
    return "grid";
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentUser, setCurrentUser] = useState(null);
  const [packingLogs, setPackingLogs] = useState({});
  const [activeLogOrder, setActiveLogOrder] = useState(null);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [copiedTrackingUrl, setCopiedTrackingUrl] = useState(false);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [viewModeModal, setViewModeModal] = useState("view");

  // Handle responsive view mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && viewMode === "table") {
        setViewMode("grid");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [viewMode]);

  /* -------------------- AUTH & INITIALIZATION -------------------- */
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      setCurrentUser(parsedAdmin);
      if (!["admin", "logistics"].includes(parsedAdmin.role)) {
        navigate("/dashboard", { replace: true });
        return;
      }
    }

    fetchOrders(token);
  }, [navigate]);

  /* -------------------- FETCH ORDERS -------------------- */
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

      // Extract packing logs from orders
      const logsByOrder = {};
      ordersList.forEach((order) => {
        if (order.packing_logs && Array.isArray(order.packing_logs)) {
          logsByOrder[order._id] = order.packing_logs;
        }
      });

      setOrders(ordersList);
      setPackingLogs(logsByOrder);
      calculateStats(ordersList);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  /* -------------------- STATS CALCULATION -------------------- */
  const calculateStats = (ordersList) => {
    const total = ordersList.length;
    const pending = ordersList.filter(
      (o) => o.scan_status === "pending",
    ).length;
    const items_scanned = ordersList.filter(
      (o) => o.scan_status === "items_scanned",
    ).length;
    const tracking_label_pending = ordersList.filter(
      (o) => o.scan_status === "tracking_label_pending",
    ).length;
    const scanned = ordersList.filter(
      (o) => o.scan_status === "scanned",
    ).length;
    const cancelled = ordersList.filter(
      (o) => o.scan_status === "cancelled",
    ).length;

    const totalValue = ordersList.reduce((sum, order) => {
      return sum + (parseFloat(order.total_price) || 0);
    }, 0);

    const averageValue = total > 0 ? totalValue / total : 0;

    setStats({
      total,
      pending,
      items_scanned,
      tracking_label_pending,
      scanned,
      cancelled,
      totalValue,
      averageValue,
    });
  };

  /* -------------------- SEARCH & FILTER -------------------- */
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

  /* -------------------- SELECTION LOGIC -------------------- */
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

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  /* -------------------- ORDER EDIT HANDLER -------------------- */
  const handleEditOrder = (order) => {
    // Deep clone the order for editing
    const editableOrder = JSON.parse(JSON.stringify(order));

    // Ensure line items have the correct structure for editing
    if (editableOrder.line_items) {
      editableOrder.line_items = editableOrder.line_items.map((item) => {
        // Check if it's a bundle (has component_scans)
        if (item.component_scans) {
          return {
            sku: item.sku,
            quantity: item.quantity || 1,
            component_scans: item.component_scans,
            is_bundle: true,
            title: item.title || "Bundle Item",
          };
        } else {
          return {
            sku: item.sku,
            quantity: item.quantity || 1,
            scanned_qty: item.scan?.scanned_qty || 0,
            title: item.title || "Unknown Product",
          };
        }
      });
    }

    setEditingOrder(editableOrder);
    setViewModeModal("edit");
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setViewModeModal("view");
  };

  const handleQuantityUpdate = (
    itemSku,
    field,
    value,
    isBundle = false,
    componentSku = null,
  ) => {
    if (!editingOrder) return;

    const updatedItems = editingOrder.line_items.map((item) => {
      if (item.sku === itemSku) {
        if (isBundle && componentSku) {
          // Update bundle component quantity
          const currentValue = parseInt(value) || 0;
          const maxValue = item.quantity;
          const newValue = Math.min(maxValue, Math.max(0, currentValue));

          return {
            ...item,
            component_scans: {
              ...item.component_scans,
              [componentSku]: newValue,
            },
          };
        } else if (field === "quantity") {
          // Update order quantity
          const newQuantity = Math.max(1, parseInt(value) || 1);
          return { ...item, quantity: newQuantity };
        } else if (field === "scanned_qty") {
          // Update scanned quantity
          const maxScanned = item.quantity;
          const newScanned = Math.min(
            maxScanned,
            Math.max(0, parseInt(value) || 0),
          );
          return { ...item, scanned_qty: newScanned };
        }
      }
      return item;
    });

    setEditingOrder({
      ...editingOrder,
      line_items: updatedItems,
    });
  };

  const saveOrderEdits = async () => {
    if (!editingOrder) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("auth_token");

      // Prepare the updates payload
      const updates = {
        line_items: editingOrder.line_items.map((item) => {
          if (item.is_bundle || item.component_scans) {
            // Bundle item
            return {
              sku: item.sku,
              quantity: item.quantity,
              component_scans: item.component_scans,
            };
          } else {
            // Regular item
            return {
              sku: item.sku,
              quantity: item.quantity,
              scanned_qty: item.scanned_qty || 0,
            };
          }
        }),
        scan_status: editingOrder.scan_status,
      };

      // Add tracking if exists
      if (editingOrder.tracking) {
        updates.tracking = editingOrder.tracking;
      }

      const res = await fetch(`${API_BASE}/api/order/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: editingOrder._id,
          updates: updates,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update order");

      alert("✅ Order updated successfully");
      setEditingOrder(null);
      setViewModeModal("view");
      fetchOrders(token);
    } catch (err) {
      console.error("Save error:", err);
      alert(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateOrderStatus = async (newStatus) => {
    if (!editingOrder) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`${API_BASE}/api/order/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: editingOrder._id,
          updates: {
            scan_status: newStatus,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      setEditingOrder({
        ...editingOrder,
        scan_status: newStatus,
      });
      alert("✅ Order status updated");
      fetchOrders(token);
    } catch (err) {
      console.error("Status update error:", err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  /* -------------------- BULK ACTIONS -------------------- */
  const handleBulkAction = async (actionType) => {
    if (selectedOrders.size === 0) {
      alert("Please select at least one order");
      return;
    }

    setBulkActionLoading(true);
    setShowBulkOps(false);

    try {
      const token = localStorage.getItem("auth_token");
      const selectedOrderIds = Array.from(selectedOrders);

      let successCount = 0;
      let errorCount = 0;

      for (const orderId of selectedOrderIds) {
        try {
          const order = orders.find((o) => o._id === orderId);
          if (!order) continue;

          const payload = {
            order_id: orderId,
            updates: {},
          };

          switch (actionType) {
            case "mark_items_scanned":
              payload.updates.line_items = order.line_items?.map((item) => {
                const bundleExpanded = order.expanded_items?.find(
                  (exp) => exp.sku === item.sku && exp.is_bundle,
                );

                if (bundleExpanded) {
                  const componentScans = {};
                  if (bundleExpanded.bundle_components) {
                    bundleExpanded.bundle_components.forEach((comp) => {
                      componentScans[comp.sku] = comp.required_qty;
                    });
                  }
                  return {
                    sku: item.sku,
                    quantity: item.quantity,
                    component_scans: componentScans,
                  };
                } else {
                  return {
                    sku: item.sku,
                    scanned_qty: item.quantity || 0,
                  };
                }
              });
              payload.updates.scan_status = "items_scanned";
              break;

            case "mark_completed":
              payload.updates.line_items = order.line_items?.map((item) => {
                const bundleExpanded = order.expanded_items?.find(
                  (exp) => exp.sku === item.sku && exp.is_bundle,
                );

                if (bundleExpanded) {
                  const componentScans = {};
                  if (bundleExpanded.bundle_components) {
                    bundleExpanded.bundle_components.forEach((comp) => {
                      componentScans[comp.sku] = comp.required_qty;
                    });
                  }
                  return {
                    sku: item.sku,
                    quantity: item.quantity,
                    component_scans: componentScans,
                  };
                } else {
                  return {
                    sku: item.sku,
                    scanned_qty: item.quantity || 0,
                  };
                }
              });
              if (order.tracking && order.tracking.number) {
                payload.updates.tracking = {
                  ...order.tracking,
                  scan_status: "scanned",
                };
              }
              payload.updates.scan_status = "scanned";
              break;

            case "clear_scans":
              payload.updates.line_items = order.line_items?.map((item) => {
                const bundleExpanded = order.expanded_items?.find(
                  (exp) => exp.sku === item.sku && exp.is_bundle,
                );

                if (bundleExpanded) {
                  const componentScans = {};
                  if (bundleExpanded.bundle_components) {
                    bundleExpanded.bundle_components.forEach((comp) => {
                      componentScans[comp.sku] = 0;
                    });
                  }
                  return {
                    sku: item.sku,
                    quantity: item.quantity,
                    component_scans: componentScans,
                  };
                } else {
                  return {
                    sku: item.sku,
                    scanned_qty: 0,
                  };
                }
              });
              payload.updates.tracking = {
                ...order.tracking,
                scan_status: "pending",
                scanned_at: null,
                scanned_by: null,
              };
              payload.updates.scan_status = "pending";
              break;

            case "cancel_orders":
              payload.updates.scan_status = "cancelled";
              if (order.tracking) {
                payload.updates.tracking = {
                  ...order.tracking,
                  scan_status: "cancelled",
                };
              }
              break;

            case "mark_pending":
              payload.updates.line_items = order.line_items?.map((item) => {
                const bundleExpanded = order.expanded_items?.find(
                  (exp) => exp.sku === item.sku && exp.is_bundle,
                );

                if (bundleExpanded) {
                  const componentScans = {};
                  if (bundleExpanded.bundle_components) {
                    bundleExpanded.bundle_components.forEach((comp) => {
                      componentScans[comp.sku] = 0;
                    });
                  }
                  return {
                    sku: item.sku,
                    quantity: item.quantity,
                    component_scans: componentScans,
                  };
                } else {
                  return {
                    sku: item.sku,
                    scanned_qty: 0,
                  };
                }
              });
              payload.updates.scan_status = "pending";
              payload.updates.tracking = {
                ...order.tracking,
                scan_status: "pending",
              };
              break;
          }

          const res = await fetch(`${API_BASE}/api/order/edit`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            successCount++;
          } else {
            const errorData = await res.json();
            console.error(
              `Failed to update order ${order.order_name}:`,
              errorData,
            );
            errorCount++;
          }
        } catch (err) {
          console.error(`Error updating order:`, err);
          errorCount++;
        }
      }

      await fetchOrders(token);

      if (errorCount === 0) {
        alert(`✅ ${successCount} orders updated successfully!`);
      } else {
        alert(`⚠️ ${successCount} orders updated, ${errorCount} failed.`);
      }

      if (successCount > 0) {
        setSelectedOrders(new Set());
      }
    } catch (err) {
      alert(`Error performing bulk action: ${err.message}`);
    } finally {
      setBulkActionLoading(false);
    }
  };

  /* -------------------- BULK DELETE -------------------- */
  const handleBulkDelete = async () => {
    if (selectedOrders.size === 0) return;

    setBulkDeleteLoading(true);
    try {
      const token = localStorage.getItem("auth_token");

      const selectedOrderIds = Array.from(selectedOrders);
      const selectedOrderNames = orders
        .filter((order) => selectedOrderIds.includes(order._id))
        .map((order) => order.order_name);

      const res = await fetch(`${API_BASE}/api/order/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_names: selectedOrderNames,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bulk delete failed");

      alert(
        `✅ ${data.deleted_orders || selectedOrders.size} orders and ${data.deleted_logs || 0} logs deleted successfully`,
      );
      setSelectedOrders(new Set());
      setShowBulkDeleteConfirm(false);
      fetchOrders(token);
    } catch (err) {
      alert(err.message);
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  /* -------------------- QUICK ACTIONS -------------------- */
  const handleQuickAction = async (order, action) => {
    try {
      const token = localStorage.getItem("auth_token");
      const currentAdmin = JSON.parse(localStorage.getItem("admin"));

      const payload = {
        order_id: order._id,
        updates: {},
      };

      switch (action) {
        case "scan_all_items":
          // Mark all items as scanned (but not tracking)
          payload.updates.line_items = order.line_items?.map((item) => {
            if (item.component_scans) {
              // Bundle item - mark all components as fully scanned
              const componentScans = {};
              if (item.component_scans) {
                Object.keys(item.component_scans).forEach((compSku) => {
                  const bundleDoc = order.expanded_items?.find(
                    (exp) => exp.sku === item.sku,
                  );
                  const bundleComponent = bundleDoc?.bundle_components?.find(
                    (comp) => comp.sku === compSku,
                  );
                  const requiredQty =
                    bundleComponent?.required_qty || item.quantity;
                  componentScans[compSku] = requiredQty;
                });
              }
              return {
                sku: item.sku,
                quantity: item.quantity,
                component_scans: componentScans,
              };
            } else {
              // Regular item
              return {
                sku: item.sku,
                scanned_qty: item.quantity || 1,
              };
            }
          });
          // Don't set scan_status - let backend determine if tracking is scanned or not
          break;

        case "clear_scans":
          // Clear all scans
          payload.updates.line_items = order.line_items?.map((item) => {
            if (item.component_scans) {
              const componentScans = {};
              if (item.component_scans) {
                Object.keys(item.component_scans).forEach((compSku) => {
                  componentScans[compSku] = 0;
                });
              }
              return {
                sku: item.sku,
                quantity: item.quantity,
                component_scans: componentScans,
              };
            } else {
              return {
                sku: item.sku,
                scanned_qty: 0,
              };
            }
          });
          payload.updates.tracking = {
            ...order.tracking,
            scan_status: "pending",
            scanned_at: null,
            scanned_by: null,
          };
          // Don't set scan_status - let backend determine
          break;

        case "mark_items_scanned":
          // Manually set status to items_scanned
          payload.updates.scan_status = "items_scanned";
          break;

        case "mark_completed":
          // Mark as fully completed (both items and tracking)
          payload.updates.line_items = order.line_items?.map((item) => {
            if (item.component_scans) {
              const componentScans = {};
              if (item.component_scans) {
                Object.keys(item.component_scans).forEach((compSku) => {
                  const bundleDoc = order.expanded_items?.find(
                    (exp) => exp.sku === item.sku,
                  );
                  const bundleComponent = bundleDoc?.bundle_components?.find(
                    (comp) => comp.sku === compSku,
                  );
                  const requiredQty =
                    bundleComponent?.required_qty || item.quantity;
                  componentScans[compSku] = requiredQty;
                });
              }
              return {
                sku: item.sku,
                quantity: item.quantity,
                component_scans: componentScans,
              };
            } else {
              return {
                sku: item.sku,
                scanned_qty: item.quantity || 1,
              };
            }
          });

          // Mark tracking as scanned if it exists
          if (order.tracking && order.tracking.number) {
            payload.updates.tracking = {
              ...order.tracking,
              scan_status: "scanned",
              scanned_at: new Date(),
              scanned_by: {
                admin_id: currentAdmin?.admin_id,
                name: currentAdmin?.name,
                role: currentAdmin?.role,
              },
            };
          }
          // Don't set scan_status - let backend determine (should become "scanned")
          break;

        case "cancel_order":
          payload.updates.scan_status = "cancelled";
          if (order.tracking) {
            payload.updates.tracking = {
              ...order.tracking,
              scan_status: "cancelled",
            };
          }
          break;
      }

      const res = await fetch(`${API_BASE}/api/order/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      alert(`✅ ${action.replace(/_/g, " ")} completed successfully`);
      fetchOrders(token);
    } catch (err) {
      console.error("Action error:", err);
      alert(err.message);
    }
  };

  /* -------------------- SINGLE DELETE -------------------- */
  const deleteOrder = async () => {
    if (!selectedOrder) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`${API_BASE}/api/order/hard-delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_name: selectedOrder.order_name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      alert(
        `🗑 Order deleted successfully (${data.deleted_logs || 0} logs removed)`,
      );
      setSelectedOrder(null);
      setShowDeleteConfirm(false);
      fetchOrders(token);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  /* -------------------- HELPER FUNCTIONS -------------------- */
  const getStatusColor = (status) => {
    switch (status) {
      case "scanned":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "tracking_label_pending":
        return "bg-gradient-to-r from-purple-500 to-pink-600";
      case "items_scanned":
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
      case "pending":
        return "bg-gradient-to-r from-amber-500 to-yellow-600";
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-rose-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "scanned":
        return "bg-green-100 text-green-800";
      case "tracking_label_pending":
        return "bg-purple-100 text-purple-800";
      case "items_scanned":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "scanned":
        return CheckCircle;
      case "tracking_label_pending":
        return Truck;
      case "items_scanned":
        return ListChecks;
      case "pending":
        return Clock;
      case "cancelled":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusDisplayName = (status) => {
    switch (status) {
      case "scanned":
        return "Completed";
      case "tracking_label_pending":
        return "Tracking Pending";
      case "items_scanned":
        return "Items Scanned";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return status?.replace("_", " ") || "Unknown";
    }
  };

  const calculateScanProgress = (order) => {
    if (!order.line_items || order.line_items.length === 0) return 0;

    let totalOrdered = 0;
    let totalScanned = 0;

    order.line_items.forEach((item) => {
      if (item.component_scans) {
        // Bundle item - sum up all components
        Object.values(item.component_scans).forEach((scanned) => {
          totalScanned += scanned;
        });
        totalOrdered += Object.keys(item.component_scans).length;
      } else {
        totalOrdered += item.quantity || 1;
        totalScanned += item.scan?.scanned_qty || 0;
      }
    });

    if (totalOrdered === 0) return 0;
    return Math.round((totalScanned / totalOrdered) * 100);
  };

  const getOrderLogs = (orderId) => {
    return packingLogs[orderId] || [];
  };

  const getRecentScanActivity = (orderId) => {
    const logs = getOrderLogs(orderId);
    return logs.slice(0, 3);
  };

  const handleExport = () => {
    const csvContent = [
      [
        "Order ID",
        "Customer",
        "Email",
        "Phone",
        "Status",
        "Tracking Status",
        "Tracking Number",
        "Tracking URL",
        "Items Scanned",
        "Total Items",
        "Progress %",
        "Created",
        "Total Amount",
        "Last Activity",
      ],
      ...filteredOrders.map((o) => {
        const progress = calculateScanProgress(o);
        const logs = getOrderLogs(o._id);
        const lastActivity =
          logs.length > 0 ? formatTimeAgo(logs[0].scanned_at) : "No activity";

        return [
          o.order_name,
          `${o.customer?.first_name || ""} ${o.customer?.last_name || ""}`,
          o.customer?.email || "",
          o.customer?.phone || "",
          getStatusDisplayName(o.scan_status),
          o.tracking?.scan_status || "pending",
          o.tracking?.number || "",
          o.tracking?.url || "",
          o.line_items?.filter(
            (i) => (i.scan?.scanned_qty || 0) >= (i.quantity || 0),
          ).length || 0,
          o.line_items?.length || 0,
          progress,
          formatDate(o.createdAt),
          o.total_price || "0",
          lastActivity,
        ];
      }),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      dateRange: "all",
      minAmount: "",
      maxAmount: "",
      hasTracking: "all",
      fulfillmentStatus: "all",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse shadow-xl">
            <ShoppingBag className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -inset-6 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center max-w-md">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Loading Orders
          </h3>
          <p className="text-slate-600 mb-6">Fetching your order data...</p>
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
            <Clock className="h-4 w-4 animate-pulse" />
            <span>Processing orders and packing logs</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6 lg:p-8 ${isFullScreen ? "fixed inset-0 z-50 bg-white overflow-auto" : ""}`}
    >
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl">
                  <ShoppingBag className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
                    Orders Dashboard
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 mt-0.5 sm:mt-1">
                    Manage, track, and audit all customer orders
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => fetchOrders(localStorage.getItem("auth_token"))}
                className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg sm:rounded-xl font-semibold hover:from-slate-800 hover:to-slate-900 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Refresh</span>
                <span className="sm:hidden">Refresh</span>
              </button>

              <button
                onClick={handleExport}
                className="px-3 py-2 sm:px-5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg sm:rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </button>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="px-3 py-2 sm:px-5 sm:py-3 bg-slate-200 text-slate-700 rounded-lg sm:rounded-xl font-semibold hover:bg-slate-300 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                {isFullScreen ? (
                  <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                </span>
                <span className="sm:hidden">
                  {isFullScreen ? "Exit" : "Full"}
                </span>
              </button>
            </div>
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 mb-6">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-indigo-900 mb-0.5 sm:mb-1">
                    Total Orders
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-indigo-900">
                    {stats.total}
                  </p>
                </div>
                <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
                  <ShoppingBag className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-amber-900 mb-0.5 sm:mb-1">
                    Pending
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-amber-900">
                    {stats.pending}
                  </p>
                </div>
                <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-900 mb-0.5 sm:mb-1">
                    Items Scanned
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-900">
                    {stats.items_scanned}
                  </p>
                </div>
                <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
                  <ListChecks className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-purple-900 mb-0.5 sm:mb-1">
                    Tracking Pending
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-900">
                    {stats.tracking_label_pending}
                  </p>
                </div>
                <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
                  <Truck className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-emerald-900 mb-0.5 sm:mb-1">
                    Completed
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-emerald-900">
                    {stats.scanned}
                  </p>
                </div>
                <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-rose-900 mb-0.5 sm:mb-1">
                    Cancelled
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-rose-900">
                    {stats.cancelled}
                  </p>
                </div>
                <div className="bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl">
                  <XCircle className="h-4 w-4 sm:h-6 sm:w-6 text-rose-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar - Responsive */}
        {selectedOrders.size > 0 && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center">
                <div className="bg-white/20 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl mr-2 sm:mr-3 backdrop-blur-sm">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">
                    {selectedOrders.size} orders selected
                  </h3>
                  <p className="text-xs text-indigo-100 hidden sm:block">
                    Choose actions to perform on selected orders
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowBulkOps(true)}
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg sm:rounded-xl transition-colors backdrop-blur-sm"
                  disabled={bulkActionLoading}
                >
                  {bulkActionLoading ? (
                    <>
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                      Bulk Actions
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedOrders(new Set())}
                  className="px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-indigo-700 bg-white rounded-lg sm:rounded-xl hover:bg-indigo-50 transition-colors"
                  disabled={bulkActionLoading}
                >
                  Clear
                </button>

                <button
                  onClick={() => setShowBulkDeleteConfirm(true)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg sm:rounded-xl hover:from-rose-600 hover:to-rose-700 transition-colors inline-flex items-center shadow-sm"
                  disabled={bulkActionLoading}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                  Delete ({selectedOrders.size})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions Modal */}
        {showBulkOps && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Bulk Actions
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {selectedOrders.size} orders selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBulkOps(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    action: "mark_items_scanned",
                    label: "Mark as Items Scanned",
                    icon: CheckCircle,
                    color: "emerald",
                    desc: "Scan all items",
                  },
                  {
                    action: "mark_completed",
                    label: "Mark as Completed",
                    icon: Check,
                    color: "green",
                    desc: "Full scan",
                  },
                  {
                    action: "clear_scans",
                    label: "Clear All Scans",
                    icon: RefreshCw,
                    color: "slate",
                    desc: "Reset scans",
                  },
                  {
                    action: "cancel_orders",
                    label: "Cancel Orders",
                    icon: XCircle,
                    color: "rose",
                    desc: "Set cancelled",
                  },
                  {
                    action: "mark_pending",
                    label: "Mark as Pending",
                    icon: Clock,
                    color: "amber",
                    desc: "Reset status",
                  },
                ].map((item) => (
                  <button
                    key={item.action}
                    onClick={() => handleBulkAction(item.action)}
                    disabled={bulkActionLoading}
                    className={`w-full inline-flex items-center justify-between px-4 py-3 text-sm font-medium text-${item.color}-700 bg-${item.color}-50 rounded-xl hover:bg-${item.color}-100 transition-colors disabled:opacity-50`}
                  >
                    <div className="flex items-center">
                      <item.icon
                        className={`h-4 w-4 mr-3 text-${item.color}-600`}
                      />
                      <span>{item.label}</span>
                    </div>
                    <span
                      className={`text-xs bg-${item.color}-100 text-${item.color}-800 px-2 py-1 rounded`}
                    >
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowBulkOps(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-5">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                <input
                  className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300 text-slate-700 placeholder-slate-400 text-sm sm:text-base"
                  placeholder="Search orders, customers, SKUs, tracking..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9 pr-8 py-2.5 sm:py-3.5 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none bg-white shadow-sm text-sm sm:text-base"
                >
                  <option value="all">All Status</option>
                  <option value="pending">🟡 Pending</option>
                  <option value="items_scanned">🔵 Items Scanned</option>
                  <option value="tracking_label_pending">
                    🟣 Tracking Pending
                  </option>
                  <option value="scanned">🟢 Completed</option>
                  <option value="cancelled">🔴 Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="inline-flex items-center px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-200 transition-colors"
              >
                <FilterIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Advanced</span>
                <span className="sm:hidden">Filters</span>
              </button>
            </div>
          </div>
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-slate-50 rounded-lg sm:rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="font-medium text-slate-900 text-sm sm:text-base">
                  Advanced Filters
                </h3>
                <button
                  onClick={resetAdvancedFilters}
                  className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Reset All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Date Range
                  </label>
                  <select
                    value={advancedFilters.dateRange}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        dateRange: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Amount Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={advancedFilters.minAmount}
                      onChange={(e) =>
                        setAdvancedFilters((prev) => ({
                          ...prev,
                          minAmount: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={advancedFilters.maxAmount}
                      onChange={(e) =>
                        setAdvancedFilters((prev) => ({
                          ...prev,
                          maxAmount: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Has Tracking
                  </label>
                  <select
                    value={advancedFilters.hasTracking}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        hasTracking: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All</option>
                    <option value="yes">With Tracking</option>
                    <option value="no">Without Tracking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                    Fulfillment
                  </label>
                  <select
                    value={advancedFilters.fulfillmentStatus}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        fulfillmentStatus: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="unfulfilled">Unfulfilled</option>
                    <option value="partial">Partially Fulfilled</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-gradient-to-r from-rose-50 to-red-100 border-l-4 border-rose-500 p-4 sm:p-5 rounded-r-xl shadow-sm">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-rose-800 text-sm sm:text-base">
                  Error loading orders
                </p>
                <p className="text-rose-700 text-xs sm:text-sm mt-1">{error}</p>
                <button
                  onClick={() =>
                    fetchOrders(localStorage.getItem("auth_token"))
                  }
                  className="mt-2 sm:mt-3 text-xs sm:text-sm text-rose-600 hover:text-rose-700 font-medium"
                >
                  Try again →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Toggle - Responsive */}
        <div className="mb-3 sm:mb-4 flex justify-between items-center">
          <div className="text-xs sm:text-sm text-slate-600">
            Showing {Math.min(filteredOrders.length, (page - 1) * pageSize + 1)}
            -{Math.min(page * pageSize, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
            {selectedOrders.size > 0 && (
              <span className="ml-2 sm:ml-4 font-medium text-indigo-700">
                ({selectedOrders.size} selected)
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm text-slate-600 mr-1 sm:mr-2 hidden sm:inline">
              View:
            </span>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${viewMode === "grid" ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              <Grid className="h-3 w-3 sm:h-4 sm:w-4 inline mr-0 sm:mr-1" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${viewMode === "table" ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
            >
              <Table className="h-3 w-3 sm:h-4 sm:w-4 inline mr-0 sm:mr-1" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>

        {/* Orders Grid View (Default on mobile) */}
        {viewMode === "grid" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {paginatedOrders.length === 0 ? (
                <div className="col-span-full bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-12 text-center">
                  <Package className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-slate-300" />
                  <p className="text-lg sm:text-xl font-medium text-slate-900">
                    No orders found
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 mt-2">
                    Try adjusting your search criteria or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
                      resetAdvancedFilters();
                    }}
                    className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                paginatedOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.scan_status);
                  const progress = calculateScanProgress(order);
                  const statusDisplayName = getStatusDisplayName(
                    order.scan_status,
                  );

                  return (
                    <div
                      key={order._id}
                      className={`bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-3 sm:p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                        selectedOrders.has(order._id)
                          ? "ring-2 ring-indigo-500"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1 sm:mb-2">
                            <button
                              onClick={() => toggleOrderSelection(order._id)}
                              className={`mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 border rounded-lg sm:rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                                selectedOrders.has(order._id)
                                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-600"
                                  : "border-slate-300 hover:border-indigo-400"
                              }`}
                            >
                              {selectedOrders.has(order._id) && (
                                <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                              )}
                            </button>
                            <div className="text-sm sm:text-base font-bold text-indigo-700 truncate">
                              {order.order_name}
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center">
                            <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                            {formatShortDate(order.createdAt)}
                          </div>
                        </div>
                        <StatusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 flex-shrink-0 ml-2" />
                      </div>

                      <div className="mb-3 sm:mb-5">
                        <div className="flex items-center mb-2">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 mr-1.5" />
                          <span className="text-xs sm:text-sm font-medium truncate">
                            {order.customer?.first_name}{" "}
                            {order.customer?.last_name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mb-1 truncate flex items-center">
                          <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {order.customer?.email || order.email}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 truncate flex items-center">
                          <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {order.shipping_address?.city || "Unknown"}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3 sm:mb-5">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">Scan Progress</span>
                          <span className="font-bold">{progress}%</span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                          <div
                            className={`h-full ${getStatusColor(order.scan_status)}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div
                          className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${getStatusBgColor(order.scan_status)}`}
                        >
                          {statusDisplayName}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3 sm:mb-5">
                        <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                          <div className="text-slate-500 text-[10px] sm:text-xs">
                            Items
                          </div>
                          <div className="font-bold text-sm sm:text-base">
                            {order.line_items?.length || 0}
                          </div>
                        </div>
                        <div className="bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                          <div className="text-slate-500 text-[10px] sm:text-xs">
                            Amount
                          </div>
                          <div className="font-bold text-sm sm:text-base">
                            ₹
                            {parseFloat(
                              order.total_price || 0,
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="flex-1 inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="flex-1 inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Edit
                        </button>
                        <select
                          className="text-[10px] sm:text-xs py-1 px-2 sm:py-1.5 sm:px-3 border border-slate-300 rounded-lg bg-white hover:bg-slate-50"
                          onChange={(e) => {
                            const action = e.target.value;
                            if (action) {
                              handleQuickAction(order, action);
                              e.target.value = "";
                            }
                          }}
                        >
                          <option value="">Quick Actions</option>
                          <option value="scan_all_items">📦 Scan All</option>
                          <option value="clear_scans">🔄 Clear Scans</option>
                          <option value="mark_completed">✅ Complete</option>
                        </select>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination for Grid View */}
            {filteredOrders.length > 0 && (
              <div className="mt-6 sm:mt-8 px-3 sm:px-4 py-3 sm:py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl sm:rounded-b-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs sm:text-sm text-slate-700 text-center sm:text-left">
                    Showing {(page - 1) * pageSize + 1} to{" "}
                    {Math.min(page * pageSize, filteredOrders.length)} of{" "}
                    {filteredOrders.length} orders
                  </div>
                  <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Previous
                    </button>

                    <div className="flex items-center space-x-0.5 sm:space-x-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (page <= 3) {
                            pageNum = i + 1;
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = page - 2 + i;
                          }

                          if (pageNum > 0 && pageNum <= totalPages) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                className={`px-2 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg transition-all ${
                                  page === pageNum
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                                    : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          return null;
                        },
                      )}

                      {totalPages > 5 && page < totalPages - 2 && (
                        <>
                          <span className="px-1 sm:px-2 text-xs sm:text-sm text-slate-500">
                            ...
                          </span>
                          <button
                            onClick={() => setPage(totalPages)}
                            className={`px-2 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg transition-all ${
                              page === totalPages
                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      Next
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600">
                      Items per page:
                    </span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className="text-xs px-2 py-1 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={200}>200</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Orders Table View (Desktop only) */}
        {viewMode === "table" && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <button
                          onClick={toggleSelectAll}
                          className={`mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 border rounded-xl flex items-center justify-center transition-all ${selectAll ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-600" : "border-slate-300 hover:border-indigo-400"}`}
                        >
                          {selectAll && (
                            <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          )}
                        </button>
                        Order Details
                      </div>
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden sm:table-cell">
                      Customer & Shipping
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status & Progress
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden lg:table-cell">
                      Tracking & Items
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden xl:table-cell">
                      Recent Activity
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 sm:px-6 py-12 sm:py-16 text-center"
                      >
                        <Package className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-slate-300" />
                        <p className="text-lg sm:text-xl font-medium text-slate-900">
                          No orders found
                        </p>
                        <p className="text-sm sm:text-base text-slate-600 mt-2">
                          Try adjusting your search criteria or filters
                        </p>
                        <button
                          onClick={() => {
                            setSearch("");
                            setStatusFilter("all");
                            resetAdvancedFilters();
                          }}
                          className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                          Clear all filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    paginatedOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.scan_status);
                      const progress = calculateScanProgress(order);
                      const allItemsScanned =
                        order.expanded_items?.every(
                          (item) => item.fully_scanned,
                        ) || false;
                      const trackingScanned =
                        order.tracking?.scan_status === "scanned";
                      const recentLogs = getRecentScanActivity(order._id);
                      const statusDisplayName = getStatusDisplayName(
                        order.scan_status,
                      );

                      return (
                        <tr
                          key={order._id}
                          className={`hover:bg-indigo-50/30 transition-colors ${selectedOrders.has(order._id) ? "bg-indigo-50 hover:bg-indigo-100" : ""}`}
                        >
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => toggleOrderSelection(order._id)}
                                className={`mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 border rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${selectedOrders.has(order._id) ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-600" : "border-slate-300 hover:border-indigo-400"}`}
                              >
                                {selectedOrders.has(order._id) && (
                                  <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                                )}
                              </button>
                              <div>
                                <div className="text-sm font-bold text-indigo-700">
                                  {order.order_name}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {formatShortDate(order.createdAt)}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />₹
                                  {parseFloat(
                                    order.total_price || 0,
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                            <div className="text-sm font-medium text-slate-900">
                              <User className="h-4 w-4 inline mr-1 text-slate-400" />
                              {order.customer?.first_name}{" "}
                              {order.customer?.last_name}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              <span className="truncate max-w-[150px]">
                                {order.customer?.email || order.email}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {order.shipping_address?.city ||
                                "Unknown location"}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex flex-col gap-2 sm:gap-3">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <StatusIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${getStatusBgColor(order.scan_status)}`}
                                >
                                  {statusDisplayName}
                                </span>
                              </div>
                              <div className="w-full">
                                <div className="flex justify-between text-[10px] sm:text-xs text-slate-600 mb-0.5">
                                  <span>Scan Progress</span>
                                  <span className="font-bold">{progress}%</span>
                                </div>
                                <div className="h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-500 ${getStatusColor(order.scan_status)}`}
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                            <div className="space-y-2">
                              {order.tracking?.number ? (
                                <div className="text-xs">
                                  <div className="font-medium text-slate-700">
                                    {order.tracking.company}
                                  </div>
                                  <code className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded mt-0.5 block truncate max-w-[150px]">
                                    {order.tracking.number}
                                  </code>
                                  <div
                                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium mt-1 ${order.tracking?.scan_status === "scanned" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                                  >
                                    {order.tracking?.scan_status || "pending"}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-xs text-slate-400 italic">
                                  No tracking
                                </span>
                              )}
                              <div className="text-[10px]">
                                <div
                                  className={
                                    allItemsScanned
                                      ? "text-emerald-600"
                                      : "text-amber-600"
                                  }
                                >
                                  Items:{" "}
                                  {allItemsScanned
                                    ? "✅ All scanned"
                                    : "⚠️ Needs scanning"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 hidden xl:table-cell">
                            <div className="space-y-1">
                              {recentLogs.length > 0 ? (
                                recentLogs.slice(0, 2).map((log, idx) => (
                                  <div
                                    key={idx}
                                    className="text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded"
                                  >
                                    {log.title || log.scan_type} •{" "}
                                    {formatTimeAgo(log.scanned_at)}
                                  </div>
                                ))
                              ) : (
                                <div className="text-[10px] text-slate-400 italic">
                                  No activity
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="flex flex-col gap-1 sm:gap-2">
                              <div className="flex gap-1 sm:gap-2">
                                <button
                                  onClick={() => handleViewOrder(order)}
                                  className="p-1.5 sm:p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                                >
                                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </button>
                                <button
                                  onClick={() => handleEditOrder(order)}
                                  className="p-1.5 sm:p-2 text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                                >
                                  <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveLogOrder(order);
                                    setShowLogsModal(true);
                                  }}
                                  className="p-1.5 sm:p-2 text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                  <FileClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </button>
                              </div>
                              <select
                                className="text-[10px] py-1 px-1.5 sm:px-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50"
                                onChange={(e) => {
                                  const action = e.target.value;
                                  if (action) {
                                    handleQuickAction(order, action);
                                    e.target.value = "";
                                  }
                                }}
                              >
                                <option value="">Quick Actions</option>
                                <option value="scan_all_items">
                                  📦 Scan All
                                </option>
                                <option value="clear_scans">🔄 Clear</option>
                                <option value="mark_completed">
                                  ✅ Complete
                                </option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination for Table View */}
            {filteredOrders.length > 0 && (
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 bg-slate-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs sm:text-sm text-slate-700 text-center sm:text-left">
                    Showing {(page - 1) * pageSize + 1} to{" "}
                    {Math.min(page * pageSize, filteredOrders.length)} of{" "}
                    {filteredOrders.length} orders
                  </div>
                  <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Previous
                    </button>

                    <div className="flex items-center space-x-0.5 sm:space-x-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (page <= 3) {
                            pageNum = i + 1;
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = page - 2 + i;
                          }

                          if (pageNum > 0 && pageNum <= totalPages) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                className={`px-2 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg transition-all ${
                                  page === pageNum
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                                    : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          return null;
                        },
                      )}

                      {totalPages > 5 && page < totalPages - 2 && (
                        <>
                          <span className="px-1 sm:px-2 text-xs sm:text-sm text-slate-500">
                            ...
                          </span>
                          <button
                            onClick={() => setPage(totalPages)}
                            className={`px-2 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg transition-all ${
                              page === totalPages
                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="inline-flex items-center px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                    >
                      Next
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex justify-center sm:justify-start">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600">
                      Items per page:
                    </span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className="text-xs px-2 py-1 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={200}>200</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View Order Modal */}
        {selectedOrder && viewModeModal === "view" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Order Details
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Order: {selectedOrder.order_name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditOrder(selectedOrder)}
                    className="px-3 py-1.5 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors inline-flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                  >
                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Customer Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span>{" "}
                          {selectedOrder.customer?.first_name}{" "}
                          {selectedOrder.customer?.last_name}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {selectedOrder.customer?.email || selectedOrder.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {selectedOrder.customer?.phone || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Tracking Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Carrier:</span>{" "}
                          {selectedOrder.tracking?.company || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Number:</span>{" "}
                          {selectedOrder.tracking?.number || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          {selectedOrder.tracking?.scan_status || "pending"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Order Status
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Current Status:</span>
                          <span
                            className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${getStatusBgColor(selectedOrder.scan_status)}`}
                          >
                            {getStatusDisplayName(selectedOrder.scan_status)}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">Created:</span>{" "}
                          {formatDate(selectedOrder.createdAt)}
                        </p>
                        <p>
                          <span className="font-medium">Total Amount:</span> ₹
                          {parseFloat(
                            selectedOrder.total_price || 0,
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Order Items
                    </h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {selectedOrder.line_items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="border border-slate-200 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-mono text-sm font-bold text-slate-900">
                                {item.sku}
                              </div>
                              <div className="text-xs text-slate-600">
                                {item.title || "Unknown Product"}
                              </div>
                            </div>
                            {item.component_scans ? (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                Bundle
                              </span>
                            ) : (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {item.scan?.scanned_qty || 0}/
                                {item.quantity || 1} scanned
                              </span>
                            )}
                          </div>
                          {item.component_scans ? (
                            <div className="mt-2 pl-3 border-l-2 border-purple-200 space-y-2">
                              <p className="text-xs font-medium text-purple-700">
                                Components:
                              </p>
                              {Object.entries(item.component_scans).map(
                                ([compSku, scannedQty]) => (
                                  <div
                                    key={compSku}
                                    className="flex justify-between text-xs"
                                  >
                                    <span>{compSku}</span>
                                    <span className="font-medium">
                                      {scannedQty} scanned
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          ) : (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-slate-600 mb-1">
                                <span>Progress</span>
                                <span>
                                  {Math.round(
                                    ((item.scan?.scanned_qty || 0) /
                                      (item.quantity || 1)) *
                                      100,
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500"
                                  style={{
                                    width: `${((item.scan?.scanned_qty || 0) / (item.quantity || 1)) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-slate-50 flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Order Modal */}
        {editingOrder && viewModeModal === "edit" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
            <div className="bg-white w-full max-w-6xl rounded-xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <Edit className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Edit Order
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Order: {editingOrder.order_name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditingOrder(null);
                    setViewModeModal("view");
                  }}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Order Status
                      </h3>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                        value={editingOrder.scan_status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(e.target.value)
                        }
                        disabled={saving}
                      >
                        <option value="pending">🟡 Pending</option>
                        <option value="items_scanned">🔵 Items Scanned</option>
                        <option value="tracking_label_pending">
                          🟣 Tracking Pending
                        </option>
                        <option value="scanned">🟢 Completed</option>
                        <option value="cancelled">🔴 Cancelled</option>
                      </select>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Tracking Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Carrier
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            value={editingOrder.tracking?.company || ""}
                            onChange={(e) =>
                              setEditingOrder({
                                ...editingOrder,
                                tracking: {
                                  ...editingOrder.tracking,
                                  company: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Tracking Number
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            value={editingOrder.tracking?.number || ""}
                            onChange={(e) =>
                              setEditingOrder({
                                ...editingOrder,
                                tracking: {
                                  ...editingOrder.tracking,
                                  number: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Tracking URL
                          </label>
                          <input
                            type="url"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            value={editingOrder.tracking?.url || ""}
                            onChange={(e) =>
                              setEditingOrder({
                                ...editingOrder,
                                tracking: {
                                  ...editingOrder.tracking,
                                  url: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Tracking Scan Status
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            value={
                              editingOrder.tracking?.scan_status || "pending"
                            }
                            onChange={(e) =>
                              setEditingOrder({
                                ...editingOrder,
                                tracking: {
                                  ...editingOrder.tracking,
                                  scan_status: e.target.value,
                                },
                              })
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="scanned">Scanned</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Edit Order Items
                    </h3>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {editingOrder.line_items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="border border-slate-200 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-mono text-sm font-bold text-slate-900">
                                {item.sku}
                              </div>
                              <div className="text-xs text-slate-600">
                                {item.title || "Unknown Product"}
                              </div>
                            </div>
                            {item.component_scans ? (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                Bundle
                              </span>
                            ) : (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Regular
                              </span>
                            )}
                          </div>

                          {item.component_scans ? (
                            // Bundle Item - Show components
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <label className="text-xs font-medium text-slate-700">
                                  Order Quantity:
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  className="w-20 px-2 py-1 border border-slate-300 rounded-lg text-sm"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityUpdate(
                                      item.sku,
                                      "quantity",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div className="pl-3 border-l-2 border-purple-200 space-y-2">
                                <p className="text-xs font-medium text-purple-700">
                                  Bundle Components:
                                </p>
                                {Object.entries(item.component_scans).map(
                                  ([compSku, scannedQty]) => (
                                    <div
                                      key={compSku}
                                      className="flex items-center justify-between gap-3"
                                    >
                                      <span className="text-xs font-mono">
                                        {compSku}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-600">
                                          Scanned:
                                        </span>
                                        <input
                                          type="number"
                                          min="0"
                                          max={item.quantity}
                                          className="w-16 px-2 py-1 border border-slate-300 rounded-lg text-sm"
                                          value={scannedQty}
                                          onChange={(e) =>
                                            handleQuantityUpdate(
                                              item.sku,
                                              "scanned_qty",
                                              e.target.value,
                                              true,
                                              compSku,
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ) : (
                            // Regular Item
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">
                                  Order Quantity
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityUpdate(
                                      item.sku,
                                      "quantity",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">
                                  Scanned Quantity
                                </label>
                                <input
                                  type="number"
                                  min="0"
                                  max={item.quantity}
                                  className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-sm"
                                  value={item.scanned_qty || 0}
                                  onChange={(e) =>
                                    handleQuantityUpdate(
                                      item.sku,
                                      "scanned_qty",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                            </div>
                          )}

                          {!item.component_scans && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-slate-600 mb-1">
                                <span>Progress</span>
                                <span>
                                  {Math.round(
                                    ((item.scanned_qty || 0) /
                                      (item.quantity || 1)) *
                                      100,
                                  )}
                                  %
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500"
                                  style={{
                                    width: `${((item.scanned_qty || 0) / (item.quantity || 1)) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setEditingOrder(null);
                    setViewModeModal("view");
                  }}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={saveOrderEdits}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center shadow-lg"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Modal */}
        {showLogsModal && activeLogOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <FileClock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Audit Logs
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Order: {activeLogOrder.order_name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLogsModal(false)}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {getOrderLogs(activeLogOrder._id).length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {getOrderLogs(activeLogOrder._id).map((log, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-0">
                            {log.scan_type === "sku" ? (
                              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                            ) : log.scan_type === "tracking" ? (
                              <Truck className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                            ) : (
                              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500" />
                            )}
                            <span className="font-medium text-slate-900 text-xs sm:text-sm">
                              {log.title || log.scan_type}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-xs text-slate-500">
                            {formatFullDateTime(log.scanned_at)}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mb-1.5">
                          {log.action === "scan" &&
                            `Scanned ${log.new_qty || 1} items`}
                          {log.action === "update" && "Updated tracking"}
                          {log.action === "cancel" && "Cancelled order"}
                          {log.action === "clear" && "Cleared scans"}
                          {log.action === "edit" && "Order edited"}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center">
                          <User className="h-2.5 w-2.5 mr-1" />
                          By: {log.scanned_by?.name || "System"} (
                          {log.scanned_by?.role || "system"})
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <FileClock className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-slate-300" />
                    <p className="text-base sm:text-lg font-medium text-slate-900">
                      No audit logs found
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">
                      No activity has been recorded for this order yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-rose-100 p-3 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Delete Order
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-rose-600 mr-3" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Order: {selectedOrder?.order_name}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Are you sure you want to permanently delete this order?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteOrder}
                  disabled={saving}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl hover:from-rose-600 hover:to-rose-700 transition-colors disabled:opacity-50 flex items-center shadow-lg"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />{" "}
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Delete Confirmation Modal */}
        {showBulkDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-rose-100 p-3 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Bulk Delete Orders
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-rose-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900">
                      {selectedOrders.size} Orders Selected
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Are you sure you want to permanently delete these orders?
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowBulkDeleteConfirm(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  disabled={bulkDeleteLoading}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl hover:from-rose-600 hover:to-rose-700 transition-colors disabled:opacity-50 flex items-center shadow-lg"
                >
                  {bulkDeleteLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />{" "}
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete{" "}
                      {selectedOrders.size} Orders
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
