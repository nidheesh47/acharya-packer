export const ORDER_STATUSES = {
  pending: 'pending',
  items_scanned: 'items_scanned',
  tracking_label_pending: 'tracking_label_pending',
  scanned: 'scanned',
  cancelled: 'cancelled'
};

export const ORDER_STATUS_DISPLAY = {
  [ORDER_STATUSES.pending]: 'Pending',
  [ORDER_STATUSES.items_scanned]: 'Items Scanned',
  [ORDER_STATUSES.tracking_label_pending]: 'Tracking Pending',
  [ORDER_STATUSES.scanned]: 'Completed',
  [ORDER_STATUSES.cancelled]: 'Cancelled'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUSES.pending]: 'from-amber-500 to-yellow-600',
  [ORDER_STATUSES.items_scanned]: 'from-blue-500 to-indigo-600',
  [ORDER_STATUSES.tracking_label_pending]: 'from-purple-500 to-pink-600',
  [ORDER_STATUSES.scanned]: 'from-green-500 to-emerald-600',
  [ORDER_STATUSES.cancelled]: 'from-red-500 to-rose-600'
};

export const ORDER_STATUS_BG_COLORS = {
  [ORDER_STATUSES.pending]: 'bg-amber-100 text-amber-800',
  [ORDER_STATUSES.items_scanned]: 'bg-blue-100 text-blue-800',
  [ORDER_STATUSES.tracking_label_pending]: 'bg-purple-100 text-purple-800',
  [ORDER_STATUSES.scanned]: 'bg-green-100 text-green-800',
  [ORDER_STATUSES.cancelled]: 'bg-red-100 text-red-800'
};

export const BULK_ACTIONS = [
  { action: 'mark_items_scanned', label: 'Mark as Items Scanned', icon: 'CheckCircle', color: 'emerald', desc: 'Scan all items' },
  { action: 'mark_completed', label: 'Mark as Completed', icon: 'Check', color: 'green', desc: 'Full scan' },
  { action: 'clear_scans', label: 'Clear All Scans', icon: 'RefreshCw', color: 'slate', desc: 'Reset scans' },
  { action: 'cancel_orders', label: 'Cancel Orders', icon: 'XCircle', color: 'rose', desc: 'Set cancelled' },
  { action: 'mark_pending', label: 'Mark as Pending', icon: 'Clock', color: 'amber', desc: 'Reset status' }
];

export const PAGE_SIZE_OPTIONS = [25, 50, 100, 200];
export const DEFAULT_PAGE_SIZE = 50;
export const API_BASE = import.meta.env.VITE_APP_URL;