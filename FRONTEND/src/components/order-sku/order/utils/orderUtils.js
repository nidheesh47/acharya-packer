export const calculateScanProgress = (order) => {
  if (!order.line_items || order.line_items.length === 0) return 0;

  let totalOrdered = 0;
  let totalScanned = 0;

  order.line_items.forEach((item) => {
    if (item.component_scans) {
      Object.values(item.component_scans).forEach(scanned => {
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

export const calculateStats = (ordersList) => {
  const total = ordersList.length;
  const pending = ordersList.filter(o => o.scan_status === "pending").length;
  const items_scanned = ordersList.filter(o => o.scan_status === "items_scanned").length;
  const tracking_label_pending = ordersList.filter(o => o.scan_status === "tracking_label_pending").length;
  const scanned = ordersList.filter(o => o.scan_status === "scanned").length;
  const cancelled = ordersList.filter(o => o.scan_status === "cancelled").length;

  const totalValue = ordersList.reduce((sum, order) => {
    return sum + (parseFloat(order.total_price) || 0);
  }, 0);

  const averageValue = total > 0 ? totalValue / total : 0;

  return { total, pending, items_scanned, tracking_label_pending, scanned, cancelled, totalValue, averageValue };
};

export const getOrderLogs = (packingLogs, orderId) => {
  return packingLogs[orderId] || [];
};

export const getRecentScanActivity = (packingLogs, orderId) => {
  const logs = getOrderLogs(packingLogs, orderId);
  return logs.slice(0, 3);
};

export const exportToCSV = (filteredOrders, calculateScanProgress, getOrderLogs, formatTimeAgo, formatDate, getStatusDisplayName) => {
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
      const lastActivity = logs.length > 0 ? formatTimeAgo(logs[0].scanned_at) : "No activity";

      return [
        o.order_name,
        `${o.customer?.first_name || ""} ${o.customer?.last_name || ""}`,
        o.customer?.email || "",
        o.customer?.phone || "",
        getStatusDisplayName(o.scan_status),
        o.tracking?.scan_status || "pending",
        o.tracking?.number || "",
        o.tracking?.url || "",
        o.line_items?.filter(i => (i.scan?.scanned_qty || 0) >= (i.quantity || 0)).length || 0,
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