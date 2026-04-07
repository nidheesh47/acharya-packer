export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const calculateItemTotals = (items) => {
  let totalItems = 0;
  let validSkus = 0;
  let invalidSkus = 0;
  
  items.forEach(item => {
    const quantity = Number(item.quantity) || 0;
    totalItems += quantity;
    
    if (item.sku.trim() !== "") {
      if (item.skuDetails) {
        validSkus++;
      } else {
        invalidSkus++;
      }
    }
  });
  
  return { totalItems, validSkus, invalidSkus };
};

export const getSkuDetails = (sku, skus) => {
  return skus.find(s => s.sku === sku) || null;
};