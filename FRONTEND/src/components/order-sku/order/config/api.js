export const API_BASE = import.meta.env.VITE_APP_URL;

export const API_ENDPOINTS = {
  GET_ALL_ORDERS: `${API_BASE}/api/get/all/order`,
  EDIT_ORDER: `${API_BASE}/api/order/edit`,
  HARD_DELETE_ORDER: `${API_BASE}/api/order/hard-delete`,
};