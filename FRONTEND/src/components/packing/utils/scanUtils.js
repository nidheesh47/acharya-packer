export const processOrderItems = (items) => {
  if (!items) return [];
  const processed = [];
  const bundleGroups = {};
  
  items.forEach(item => { 
    if (item.source_info?.type === 'bundle_main') 
      bundleGroups[item.sku] = { ...item, bundle_components: [] }; 
  });
  
  items.forEach(item => {
    if (item.source_info?.type === 'bundle_component') {
      const bundleSku = item.source_info.bundle_sku;
      if (bundleGroups[bundleSku]) 
        bundleGroups[bundleSku].bundle_components.push(item);
    } else if (item.source_info?.type === 'regular') {
      processed.push(item);
    }
  });
  
  Object.values(bundleGroups).forEach(bundle => {
    const allScanned = bundle.bundle_components.every(c => c.fully_scanned);
    bundle.fully_scanned = allScanned;
    bundle.scanned_qty = bundle.bundle_components.filter(c => c.fully_scanned).length;
    bundle.pending_qty = bundle.bundle_components.filter(c => !c.fully_scanned).length;
    bundle.is_bundle = true;
    processed.push(bundle);
  });
  
  return processed;
};

export const calculateScanProgress = (items) => {
  if (!items?.length) return 0;
  let totalOrdered = 0, totalScanned = 0;
  items.forEach(i => {
    if (i.is_bundle && i.bundle_components) {
      i.bundle_components.forEach(c => {
        totalOrdered += c.ordered_qty || 0;
        totalScanned += c.scanned_qty || 0;
      });
    } else {
      totalOrdered += i.ordered_qty || 0;
      totalScanned += i.scanned_qty || 0;
    }
  });
  return Math.round((totalScanned / totalOrdered) * 100);
};

export const findNextItemToScan = (items) => {
  if (!items) return null;
  for (const i of items) {
    if (i.is_bundle) {
      const next = i.bundle_components?.find(c => !c.fully_scanned);
      if (next) return { ...next, is_part_of_bundle: true, bundle_name: i.product_name, bundle_sku: i.sku };
    } else if (!i.fully_scanned) return i;
  }
  return null;
};

export const getScannedItems = (items) => {
  const scanned = [];
  items?.forEach(i => {
    if (i.is_bundle && i.bundle_components?.some(c => c.scanned_qty > 0)) {
      scanned.push({ ...i, display_qty: i.bundle_components.filter(c => c.fully_scanned).length, total_qty: i.bundle_components.length });
    } else if (i.scanned_qty > 0) {
      scanned.push({ ...i, display_qty: i.scanned_qty, total_qty: i.ordered_qty });
    }
  });
  return scanned;
};