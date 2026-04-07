// utils/skuUtils.js
export const calculateStats = (summary) => {
  let totalOrdered = 0;
  let totalPacked = 0;
  let totalPending = 0;

  Object.keys(summary.ordered || {}).forEach((sku) => {
    totalOrdered += summary.ordered[sku] || 0;
    totalPacked += summary.packed[sku] || 0;
    totalPending += summary.pending[sku] || 0;
  });

  const completionRate = totalOrdered > 0
    ? Math.round((totalPacked / totalOrdered) * 100)
    : 0;

  const trend = completionRate >= 80 ? 'up' : completionRate >= 50 ? 'stable' : 'down';

  return {
    totalSkus: Object.keys(summary.ordered || {}).length,
    totalOrdered,
    totalPacked,
    totalPending,
    completion: completionRate,
    trend
  };
};

export const getSKUStatus = (percent) => {
  if (percent >= 80) return "complete";
  if (percent >= 50) return "progress";
  return "critical";
};

export const exportToCSV = (skus, ordered, packed, pending, shopDomain) => {
  const rows = [
    ["SKU", "Ordered", "Packed", "Pending", "Completion %"],
    ...skus.map((sku) => {
      const o = ordered[sku] || 0;
      const p = packed[sku] || 0;
      const pend = pending[sku] || 0;
      const percent = o > 0 ? Math.round((p / o) * 100) : 0;
      return [sku, o, p, pend, percent];
    }),
  ];

  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `sku-quantity-summary-${shopDomain}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};