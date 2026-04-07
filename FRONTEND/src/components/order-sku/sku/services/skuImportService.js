// services/skuImportService.js
const API_BASE = import.meta.env.VITE_APP_URL;

export const skuImportService = {
  async bulkImport(file, token) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/api/sku/bulk-import`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data.error || "Bulk SKU import failed");
    }

    return data;
  }
};