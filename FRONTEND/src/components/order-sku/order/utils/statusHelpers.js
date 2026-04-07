import { ORDER_STATUS_DISPLAY, ORDER_STATUS_COLORS, ORDER_STATUS_BG_COLORS } from '../constants/orderConstants';
import { CheckCircle, Clock, ListChecks, Truck, XCircle, AlertCircle } from 'lucide-react';

export const getStatusColor = (status) => {
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

export const getStatusBgColor = (status) => {
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

export const getStatusIcon = (status) => {
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

export const getStatusDisplayName = (status) => {
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