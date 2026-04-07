// services/skuService.js
const API_BASE = import.meta.env.VITE_APP_URL;

export const skuService = {
  async fetchSummary(token) {
    const res = await fetch(`${API_BASE}/api/order/pending-scan-summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to load summary");
    }

    return res.json();
  },
};
