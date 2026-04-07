import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_APP_URL;

export function useSKUManagement() {
  const navigate = useNavigate();
  const [skus, setSkus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [skuToDelete, setSkuToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [bundlePreview, setBundlePreview] = useState(null);
  const [existingSkus, setExistingSkus] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    simple: 0,
    bundles: 0,
    withImages: 0,
    withoutNames: 0,
    complete: 0,
  });

  const [editingSku, setEditingSku] = useState(null);
  const [form, setForm] = useState({
    sku: "",
    new_sku: "",
    product_name: "",
    image_url: "",
    sku_type: "simple",
    bundle_items: [],
  });

  const fetchSkus = async (token) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/sku/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch SKUs");
      }

      const skusData = data.skus || [];
      setSkus(skusData);
      setExistingSkus(skusData);

      // Calculate stats
      const simpleCount = skusData.filter(
        (s) => s.sku_type === "simple" || !s.sku_type,
      ).length;
      const bundleCount = skusData.filter(
        (s) => s.sku_type === "bundle",
      ).length;
      const withImagesCount = skusData.filter((s) => s.image_url).length;
      const withoutNamesCount = skusData.filter((s) => !s.product_name).length;
      const completeCount = skusData.filter(
        (s) => s.product_name && s.image_url,
      ).length;

      setStats({
        total: skusData.length,
        simple: simpleCount,
        bundles: bundleCount,
        withImages: withImagesCount,
        withoutNames: withoutNamesCount,
        complete: completeCount,
      });

      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (skuItem) => {
    setEditingSku(skuItem.sku);
    setForm({
      sku: skuItem.sku,
      new_sku: "",
      product_name: skuItem.product_name || "",
      image_url: skuItem.image_url || "",
      sku_type: skuItem.sku_type || "simple",
      bundle_items:
        skuItem.bundle_items?.map((item) => ({
          sku: item.sku,
          quantity: item.quantity,
        })) || [],
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("auth_token");
    setActionLoading(form.sku);

    try {
      const payload = { sku: form.sku };

      if (form.new_sku) payload.new_sku = form.new_sku;
      if (form.product_name !== undefined)
        payload.product_name = form.product_name;
      if (form.image_url !== undefined) payload.image_url = form.image_url;

      payload.sku_type = form.sku_type;

      if (form.sku_type === "bundle") {
        const validItems = form.bundle_items.filter(
          (item) => item.sku && item.sku.trim() !== "" && item.quantity > 0,
        );

        if (validItems.length === 0) {
          alert("Bundle must contain at least one valid item");
          return;
        }

        payload.bundle_items = validItems;
      }

      const response = await fetch(`${API_BASE}/api/sku/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update SKU");
      }

      if (data.auto_created_skus && data.auto_created_skus.length > 0) {
        alert(
          `SKU updated successfully!\n\nAuto-created SKUs:\n${data.auto_created_skus
            .map((s) => `- ${s.sku} (${s.action})`)
            .join("\n")}`,
        );
      }

      await fetchSkus(token);
      setEditingSku(null);
      setBundlePreview(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!skuToDelete) return;

    const token = localStorage.getItem("auth_token");
    setActionLoading(skuToDelete);

    try {
      const response = await fetch(`${API_BASE}/api/sku/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sku: skuToDelete }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete SKU");
      }

      await fetchSkus(token);
      setShowConfirm(false);
      setSkuToDelete(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const checkSkuExists = (skuCode) => {
    return existingSkus.some((s) => s.sku === skuCode);
  };

  const filteredSkus = skus.filter((sku) => {
    return (
      sku.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleExport = () => {
    const csvContent = [
      ["SKU", "Product Name", "SKU Type", "Bundle Items Count", "Image URL"],
      ...filteredSkus.map((sku) => [
        sku.sku,
        sku.product_name || "N/A",
        sku.sku_type || "simple",
        sku.sku_type === "bundle" ? sku.bundle_items?.length || 0 : "N/A",
        sku.image_url || "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sku_catalog_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const adminData = localStorage.getItem("admin");

    if (!token) {
      navigate("/user/login", { replace: true });
      return;
    }

    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      if (!["admin", "logistics"].includes(parsedAdmin.role)) {
        navigate("/dashboard", { replace: true });
        return;
      }
    }

    fetchSkus(token);
  }, [navigate]);

  return {
    skus,
    loading,
    actionLoading,
    error,
    searchTerm,
    showConfirm,
    skuToDelete,
    viewMode,
    bundlePreview,
    existingSkus,
    stats,
    editingSku,
    form,
    filteredSkus,
    setSearchTerm,
    setShowConfirm,
    setSkuToDelete,
    setViewMode,
    setBundlePreview,
    setEditingSku,
    setForm,
    fetchSkus: () => fetchSkus(localStorage.getItem("auth_token")),
    startEdit,
    handleUpdate,
    handleDelete,
    checkSkuExists,
    handleExport,
  };
}
