// utils/fileUtils.js
export const isValidFileType = (fileName) => {
  const validExtensions = ['.csv', '.xls', '.xlsx'];
  return validExtensions.some(ext => fileName?.toLowerCase().endsWith(ext));
};

export const getFileIcon = (fileName) => {
  if (fileName?.endsWith('.csv')) return 'FileSpreadsheet';
  if (fileName?.endsWith('.xlsx') || fileName?.endsWith('.xls')) return 'FileSpreadsheet';
  return 'FileText';
};

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 bytes';
  if (bytes < 1024) return bytes + ' bytes';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
};

export const parseBundleFormat = (bundleString) => {
  if (!bundleString) return [];
  return bundleString.split('|').map(item => {
    const [sku, qty] = item.split(':');
    return { sku: sku?.trim(), quantity: parseInt(qty) || 1 };
  });
};